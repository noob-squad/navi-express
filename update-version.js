const fs = require('fs');
const packageJsonPath = './package.json';
const packageJson = require(packageJsonPath);
const versionComponents = packageJson.version.split('.').map(num => parseInt(num, 10));
versionComponents[2] += 1;
packageJson.version = versionComponents.join('.');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated version to ${packageJson.version}`);
