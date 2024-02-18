import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
  let response: string[] = [];

  const allFilesAndFolders = fs.readdirSync(folderPath);
  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path.join(folderPath, file);

    if (
      fullFilePath.includes(`${path.sep}.git${path.sep}`) ||
      fullFilePath.includes(`${path.sep}node_modules${path.sep}`)
    ) {
      return;
    }

    if (fs.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath));
    } else {
      response.push(fullFilePath);
    }
  });
  return response;
};
