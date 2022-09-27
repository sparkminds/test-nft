import React, { useState } from "react";

interface UploadProps {}

const Upload: React.FunctionComponent<UploadProps> = (props) => {
  const [fileImg, setFileImg] = useState<any>();

  console.log("file image", fileImg);

  const sendFileToIPFS = async (e: any) => {
    e.preventDefault();
    if (fileImg) {
      try {
        console.log("in try");
        const formData = new FormData();
        formData.append("file", fileImg);
        console.log("file image in try", formData.get("file"));
        const res = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Credentials": "true",
              pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
              pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
            },
            body: formData,
          }
        );
        console.log("call api successs");

        console.log("res", res);
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={sendFileToIPFS} encType="multipart/form-data">
      <input
        type="file"
        onChange={(e) => setFileImg(e.target.files ? e.target.files[0] : {})}
        required
      />
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default Upload;
