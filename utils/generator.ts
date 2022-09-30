import { DirectoryTree } from "directory-tree";
import { read } from "jimp";
import { getBackground, getEyes, getFace } from "./traits";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const build = async (index: number, onComplete: any, treeBG: DirectoryTree, treeFace: DirectoryTree, treeEyes: DirectoryTree) => {
  var _traits = [];

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

  const eye = getEyes(treeEyes);
  const eyesJimp = await read(
    `./public/images/input_images/left_eye/${eye.path.split("\\")[4]
    }/${eye.name}`
  );
  _traits.push({
    trait_type: "Eyes",
    value: eye.name,
  });

  _composedImage.blit(eyesJimp, 0, 0);

  await _composedImage.write("public/images/output_random_nft/" + index + ".png");
  await sleep(20);

  onComplete();
};

export { build };

