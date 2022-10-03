import { DirectoryTree } from "directory-tree";
import { read } from "jimp";
import { getAccessory, getBackground, getFace, getLeftEye, getMouth, getRightEye } from "./traits";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const build = async (
  index: number, onComplete: any, treeBG: DirectoryTree,
  treeFace: DirectoryTree, treeLeftEye: DirectoryTree,
  treeMouth: DirectoryTree, treeAccessory: DirectoryTree,
  treeRightEye: DirectoryTree
) => {
  var _traits = [];
  // background
  const background = getBackground(treeBG);
  const backgroundJimp = await read(
    `./public/images/input_images/background/${background.path.split("\\")[4]
    }/${background.name}`
  );
  _traits.push({
    trait_type: "Background",
    value: background.name,
  });

  var _composedImage = backgroundJimp;

  //face
  const face = getFace(treeFace);
  const faceJimp = await read(
    `./public/images/input_images/face/${face.path.split("\\")[4]
    }/${face.name}`
  );
  _traits.push({
    trait_type: "Face",
    value: face.name,
  });

  _composedImage.blit(faceJimp, 0, 0);

  // left eye
  const eyeLeft = getLeftEye(treeLeftEye);
  const eyeLeftJimp = await read(
    `./public/images/input_images/left_eye/${eyeLeft.path.split("\\")[4]
    }/${eyeLeft.name}`
  );
  _traits.push({
    trait_type: "Left Eye",
    value: eyeLeft.name,
  });

  _composedImage.blit(eyeLeftJimp, 0, 0);

  // right eye
  const eyeRight = getRightEye(treeRightEye);
  const eyeRightJimp = await read(
    `./public/images/input_images/right_eye/${eyeRight.path.split("\\")[4]
    }/${eyeRight.name}`
  );
  _traits.push({
    trait_type: "Right Eye",
    value: eyeRight.name,
  });

  _composedImage.blit(eyeRightJimp, 0, 0);

  // accessory
  const accessory = getAccessory(treeAccessory);
  const accessoryJimp = await read(
    `./public/images/input_images/accessory/${accessory.path.split("\\")[4]
    }/${accessory.name}`
  );
  _traits.push({
    trait_type: "Accessory",
    value: accessory.name,
  });

  _composedImage.blit(accessoryJimp, 0, 0);

  // mounth
  const mouth = getMouth(treeMouth);
  const mounthJimp = await read(
    `./public/images/input_images/mouth/${mouth.path.split("\\")[4]
    }/${mouth.name}`
  );
  _traits.push({
    trait_type: "Mouth",
    value: mouth.name,
  });

  _composedImage.blit(mounthJimp, 0, 0);

  ////////////////////////////
  await _composedImage.write(`public/images/output_random_nft/NFT-${index}.png`);
  await sleep(20);

  onComplete();
};

export { build };

