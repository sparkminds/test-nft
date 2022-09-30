import { RcFile } from "antd/lib/upload";
import React, { useEffect, useState } from "react";

interface StepTwoProps {}

const StepTwo: React.FunctionComponent<StepTwoProps> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const [imgUrl, setImgUrl] = useState<any[]>([]);
  const [allFile, setAllFile] = useState<any>({});
  const [result, setResult] = useState<{ title: string }>();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    if (img && img?.name) {
      reader?.readAsDataURL(img);
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    (async () => {
      if (imgUrl && Object.keys(imgUrl).length > 0) {
        await fetch("/api/upload", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listFile: imgUrl,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setResult(data);
          });
      }
    })();
  }, [imgUrl]);

  return (
    <div className="step-2">
      <h1>Drop your input folder below to start the NFT generator</h1>
      <p>Download example input folder</p>
      <div className="upload-folder">
        <label htmlFor="file">Upload your folder</label>
        <input
          type="file"
          ref={ref}
          onChange={(e) => handleChange(e)}
          id="file"
        />
      </div>
    </div>
  );
};

export default StepTwo;
