import { read } from "jimp";
import { getBackground, getEyes, getFace } from "./traits";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const build = async (index, onComplete, treeBG, treeFace, treeEyes) => {
  var _traits = [];
  console.log("check indexxx", index);
  const background = getBackground(treeBG);
  const backgroundJimp = await read(
    `../sparkminds-nft/public/images/input_images/background/${
      background.path.split("\\")[4]
    }/${background.name}`
  );
  _traits.push({
    trait_type: "Background",
    value: background.name,
  });

  var _composedImage = backgroundJimp;

  const face = getFace(treeFace);
  const faceJimp = await read(
    `../sparkminds-nft/public/images/input_images/face/${
      face.path.split("\\")[4]
    }/${face.name}`
  );
  _traits.push({
    trait_type: "Face",
    value: face.name,
  });

  _composedImage.blit(faceJimp, 0, 0);

  const eye = getEyes(treeEyes);
  const eyesJimp = await read(
    `../sparkminds-nft/public/images/input_images/left_eye/${
      eye.path.split("\\")[4]
    }/${eye.name}`
  );
  _traits.push({
    trait_type: "Eyes",
    value: eye.name,
  });

  _composedImage.blit(eyesJimp, 0, 0);

  await _composedImage.write("Output/images/" + index + ".png");
  await sleep(20);

  onComplete();
};

export { build };
