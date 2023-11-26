import {readdirSync, statSync, readFileSync, writeFileSync} from 'fs';
import {join, extname} from 'path';

const licenseHeader = `/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */`;

function addLicenseToFiles(dir) {
    readdirSync(dir).forEach(file => {
        const filePath = join(dir, file);
        if (statSync(filePath).isDirectory()) {
            addLicenseToFiles(filePath);
        } else if (['.ts', '.js', '.cts', '.cjs'].includes(extname(file))) {
            const content = readFileSync(filePath, 'utf8');
            if (!content.startsWith(licenseHeader)) {
                writeFileSync(filePath, licenseHeader + '\n\n' + content, 'utf8');
            }
        }
    });
}

// Get directory from command line arguments
const directory = process.argv[2];

// Validate the directory
if (!directory) {
    console.error('Please specify a directory');
    process.exit(1);
}

addLicenseToFiles(directory);
