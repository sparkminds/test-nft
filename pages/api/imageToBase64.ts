import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
type Data = {
    title?: string;
}
function base64_encode(file: any) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var base64str = base64_encode('./public/images/banner.png');
    res.json({
        title: base64str
    })
}
