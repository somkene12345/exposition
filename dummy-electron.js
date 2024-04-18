const path = require('path');

function getElectronPath () {
  const pathFile = path.join(__dirname, 'path.txt');
  let executablePath;

  if (process.env.NODE_ENV === 'production') {
    // If in production mode, use the default electron path
    executablePath = 'electron';
  } else {
    // In development mode, use a dynamic import to avoid loading fs in the browser
    import('fs').then((fs) => {
      if (fs.existsSync(pathFile)) {
        executablePath = fs.readFileSync(pathFile, 'utf-8');
      }
    }).catch((err) => {
      console.error('Error loading fs:', err);
    });
  }

  if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
    return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || 'electron');
  }
  if (executablePath) {
    return path.join(__dirname, 'dist', executablePath);
  } else {
    throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again');
  }
}

module.exports = getElectronPath();
