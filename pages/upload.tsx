import { RcFile } from "antd/lib/upload";
import React, { useCallback, useEffect, useState } from "react";

interface IUploadImageProps {}
const UploadImage: React.FunctionComponent<IUploadImageProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<any[]>([]);
  console.log("img", imgUrl);
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
      await fetch("/api/hello", {
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

  return (
    <>
      {/* <Image alt="" src={imgUrl as string} width={250} height={250} /> */}
      <input type="file" ref={ref} onChange={(e) => handleChange(e)} />
      <button onClick={() => obSubmitForm()}>Upload</button>
    </>
  );
};

export default UploadImage;
