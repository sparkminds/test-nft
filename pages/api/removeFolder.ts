import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
type Data = {
    title?: string;
};
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    ["./public/images/input_images", "./public/images/output_random_nft"].forEach((item) => (
        fs.rmdir(item, { recursive: true }, (err) => {
            if (err) {
                res.status(400).json({
                    title: "Some thing wrongs",
                });
            }
            res.status(200).json({
                title: "Clear done",
            });
        })
    ))
}
