import { RcFile } from "antd/lib/upload";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

interface IUploadImageProps {}
const listLevevel = ["super_rare", "rare", "legendary", "common"];
const listElement = ["background", "face", "left_eye"];
const UploadImage: React.FunctionComponent<IUploadImageProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string>();
  const [allFile, setAllFile] = useState<any>({});
  console.log(allFile);

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
    setAllFile(e.target.files);
    getBase64(e.target.files[0] as RcFile, (url) => {
      setImgUrl(url);
    });
  };

  const obSubmitForm = async () => {
    await fetch("http://localhost:8081/post-test", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "21132132", pages: "1000" }),
    });
  };

  return (
    <>
      {/* <Image alt="" src={imgUrl as string} width={250} height={250} /> */}
      <input type="file" ref={ref} onChange={(e) => handleChange(e)} />
      <button onClick={() => obSubmitForm()}>Upload</button>
    </>
  );
};

export default UploadImage;
