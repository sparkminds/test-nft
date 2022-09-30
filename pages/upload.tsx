import { Button } from "antd";
import { RcFile } from "antd/lib/upload";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepOne from "../components/createNFT/step-1";
import StepTwo from "../components/createNFT/step-2";
import collection_icon from "../public/images/collection.png";
import generate_icon from "../public/images/generate_collection.png";
import { setStep } from "../redux/slice/createNFTSlice";

const optionsGenerate = [
  {
    title: "New Collection",
    img: collection_icon,
    desc: "Already have your NFT assets? Upload and launch your NFT collection.",
    btnText: "New Collection",
  },
  {
    title: "Generate Collection",
    img: generate_icon,
    desc: "Create and launch your randomly generated NFT collection.",
    btnText: "Generate Collection",
  },
];
interface IUploadImageProps {}
const UploadImage: React.FunctionComponent<IUploadImageProps> = (props) => {
  const dispatch = useDispatch();

  const ref = React.useRef<HTMLInputElement>(null);

  const stepNFT = useSelector((state: any) => state.nft.step);

  const [imgUrl, setImgUrl] = useState<any[]>([]);
  const [allFile, setAllFile] = useState<any>({});

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    if (img && img?.name) {
      reader?.readAsDataURL(img);
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  const handleChange = (e: any) => {
    setImgUrl([]);
    setAllFile(e.target.files);
  };

  useEffect(() => {
    if (allFile && Object.keys(allFile).length > 0) {
      Object.keys(allFile).forEach((item) => {
        getBase64(allFile[item] as RcFile, (url) => {
          setImgUrl((prev) => [
            ...prev,
            {
              base64: url,
              source: allFile[item]?.webkitRelativePath,
            },
          ]);
        });
      });
    }
  }, [allFile]);

  const obSubmitForm = useCallback(async () => {
    if (allFile && Object.keys(allFile).length > 0) {
      await fetch("/api/upload", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listFile: imgUrl,
        }),
      });
    }
  }, [allFile, imgUrl]);

  // const obSubmitForm = async () => {
  //   await fetch("/api/generate");
  // };

  const handleChooseOption = (index: number) => {
    if (index === 0) {
      dispatch(setStep(1));
    }
    if (index === 1) {
      dispatch(setStep(2));
    }
  };

  return (
    <>
      <div className="create">
        {!stepNFT && (
          <>
            <h1 className="create__title">Create Collection</h1>
            <span className="create__sub-title">
              Select New or Generate collection to launch your NFTs in 3 easy
              steps.
            </span>
            <div className="create__options">
              {optionsGenerate.map((item, index) => (
                <div className="create__options__item" key={index}>
                  <h2>{item.title}</h2>
                  <Image alt="" src={item.img} width={75} height={75} />
                  <span className="create__options__item__desc">
                    {item.desc}
                  </span>
                  <Button onClick={() => handleChooseOption(index)}>
                    {item.btnText}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
        {stepNFT === 2 && <StepOne />}
        {stepNFT === 2.2 && <StepTwo />}
      </div>
      {/* <input type="file" ref={ref} onChange={(e) => handleChange(e)} />
      <button onClick={() => dispatch(setStep(2))}>Upload</button> */}
    </>
  );
};

export default UploadImage;
