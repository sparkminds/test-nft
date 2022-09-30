import type { NextApiRequest, NextApiResponse } from 'next'
import { build } from '../../utils/generator';
import dirTree from "directory-tree";
type Data = {
  status?: string;
}

const treeBG = dirTree("./public/images/input_images/background");
const treeFace = dirTree("./public/images/input_images/face");
const treeEyes = dirTree("./public/images/input_images/left_eye");

var totalBG = 0;
var totalFace = 0;
var totalEyes = 0;

treeBG?.children?.forEach(item => {
  return totalBG = totalBG + (item?.children?.length || 0)
})

treeFace?.children?.forEach(item => {
  return totalFace = totalFace + (item?.children?.length || 0)
})

treeEyes?.children?.forEach(item => {
  return totalEyes = totalEyes + (item?.children?.length || 0)
})


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var _thisIndex = 1;
  const _maxSupply = 10;
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
      res.status(400).json({
        status: `Getting error when created NFT ${_thisIndex}`
      })
      _thisIndex = _maxSupply + 1;
    }
  }

  res.status(200).json({
    status: "Success"
  })
}
