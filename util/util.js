import fs from "fs";
import Jimp from "jimp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    imgUrl: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export function filterImageFromURL(imgUrl) {

  return new Promise(async (resolve, reject) => {
    try {
      const outpath =
        "./tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      Jimp.read(imgUrl).then(async (img) => {
        await img
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .writeAsync(outpath);
        resolve(outpath);
      })
      .catch(err => {
        console.error(err);
      });;
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
