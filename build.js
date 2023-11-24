import dts from 'bun-plugin-dts'
import path from 'path'
import fs from 'fs'

const entrypoints = ['src/NaviExpress.ts'];

function getAllFilesInDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFilesInDir(filePath);
    } else {
      entrypoints.push(filePath);
    }
  });
}

getAllFilesInDir('./src/types')

await Bun.build({
  entrypoints: entrypoints,
  outdir: './dist',
  target: 'node',
  plugins: [
    dts()
  ],
})
