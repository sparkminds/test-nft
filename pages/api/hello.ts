// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
    res.status(200)
      .json({title: 'error'})
  } else if (req.method === 'POST') {
    const title = req.body.title
    const pages = req.body.pages
    const language = req.body.language
    const newBook = {
      id: Date.now(),
      title,
      pages,
      language
    }
    console.log(newBook);
    res.status(201)
      .json(newBook)
  }
}
