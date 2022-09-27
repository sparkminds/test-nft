// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { build } from '../../utils/generator';
import dirTree from "directory-tree";
type Data = {
  status?: any;
}

const treeBG = dirTree("./public/images/input_images/background");
const treeFace = dirTree("./public/images/input_images/face");
const treeEyes = dirTree("./public/images/input_images/left_eye");



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var _thisIndex = 1;
  const _maxSupply = 20;
  while (_thisIndex <= _maxSupply) {
    try {
      await build(
        _thisIndex,
        () => {
          _thisIndex++;
        },
        treeBG,
        treeFace,
        treeEyes
      );
    } catch (e) {
      console.error("Error while generating NFT " + _thisIndex);
      console.log(e);
      _thisIndex = _maxSupply + 1;
    }
  }

  res.status(200).json({
    status: "Success"
  })
}
