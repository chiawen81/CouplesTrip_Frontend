console.log('啟動服務，已進入start-app.js');

global.self = global; // 定義全域變數 self

const fs = require('fs');
const path = require('path');
const express = require('express');
const { join } = require('path');

async function startServer() {
  const directoryPath = path.join(__dirname, 'dist/search/browser');

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const mainFile = files.find(file => file.startsWith('main.'));

    if (mainFile) {
      const fullPath = path.join(directoryPath, mainFile);

      try {
        const mainExports = await import(fullPath);
        console.log('mainExports:', mainExports);

        if (mainExports.AppServerModule) {
          const ngExpressEngine = await import('@nguniversal/express-engine').then(module => module.ngExpressEngine);

          console.log('main.js 成功執行');

          const PORT = process.env.PORT || 4000;
          const app = express();

          app.engine('html', ngExpressEngine({
            bootstrap: mainExports.AppServerModule
          }));

          app.set('view engine', 'html');
          app.set('views', join(process.cwd(), 'dist/search/browser'));

          app.get('*.*', express.static(join(process.cwd(), 'dist/search/browser')));

          app.get('*', (req, res) => {
            res.render('index', { req, res });
          });

          app.listen(PORT, () => {
            console.log(`Node server listening on http://localhost:${PORT}`);
          });
        } else {
          console.log('AppServerModule not found in mainExports');
        }

      } catch (e) {
        console.error('Error while requiring main file:', e);
      }

    } else {
      console.log('main.js not found');
    }
  });
}

startServer().catch(err => console.error(err));
