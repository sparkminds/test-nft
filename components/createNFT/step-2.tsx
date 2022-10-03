import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setResult } from "../../redux/slice/createNFTSlice";

interface StepTwoProps {
  tree?: any;
}

const StepTwo: React.FunctionComponent<StepTwoProps> = (props) => {
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLInputElement>(null);

  // const [imgUrl, setImgUrl] = useState<any[]>([]);
  const [allFile, setAllFile] = useState<any>({});

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  const handleChange = (e: any) => {
    // setImgUrl([]);
    setAllFile(e.target.files);
  };

  const filesToBase64 = async (files: any[]) => {
    const values = await Promise.all(files?.map((x) => toBase64(x)));

    const _imgUrl = values.map((x, i) => ({
      source: files[i]?.webkitRelativePath,
      base64: x,
    }));

    // setImgUrl(_imgUrl);

    if (_imgUrl && Object.keys(_imgUrl).length > 0) {
      await fetch("/api/upload", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listFile: _imgUrl,
          tree: props.tree,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          dispatch(setResult(data));
          await fetch("api/generate");
        });
    }
  };

  useEffect(() => {
    if (allFile && Object.keys(allFile).length > 0) {
      filesToBase64(Object.keys(allFile).map((x) => allFile[x]));
    }
  }, [allFile]);

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
