import type { NextApiRequest, NextApiResponse } from 'next';
import { createImage } from '../../utils/createImage';
var ba64 = require("ba64");

type Data = {
  id?: any;
  title?: string;
  pages?: string;
  language?: string;
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.method === 'GET') {
    res.status(500)
      .json({ title: 'error' })
  } else if (req.method === 'POST') {
    createImage(req.body.listFile);
    // fs.mkdir("Output", (err) => {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log("Directory created successfully!");
    // });
    // const base64String = req.body.listFile[0]?.base64;
    // ba64.writeImageSync("C:/Users/ADMIN/Documents/Output/Background/img", base64String);
    res.status(201)
      .json({
        title: "Success"
      })
  }
}
