console.log('啟動服務，已進入start-app.js');

global.self = global; // 定義全域變數 self

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

    try {
      // 使用 require 或其他方法執行 main 檔案
      require(fullPath);
      console.log('main.js 成功執行');

    } catch (e) {
      console.error('Error while requiring main file:', e);
    };

  } else {
    console.log('main.js not found');
  };

});
