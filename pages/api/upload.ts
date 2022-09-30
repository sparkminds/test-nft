import type { NextApiRequest, NextApiResponse } from 'next';
import { createImage } from '../../utils/createImage';

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
    res.status(201)
      .json({
        title: "Success"
      })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}