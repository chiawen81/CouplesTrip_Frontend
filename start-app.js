const fs = require('fs');
const path = require('path');

// 設置正確的目錄
const directoryPath = path.join(__dirname, 'dist/search/browser');

// 讀取目錄下的所有檔案，找到 main.js
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  // 尋找檔名以 'main.' 開始的檔案
  const mainFile = files.find((file) => file.startsWith('main.'));

  if (mainFile) {
    const fullPath = path.join(directoryPath, mainFile);

    // 使用 require 或其他方法執行 main 檔案
    require(fullPath);
  } else {
    console.log('main.js not found');
  }
});
