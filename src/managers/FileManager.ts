/*
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
 */

import {Class} from 'types/types';
import f from 'fs';
import p from 'path';

export default class FileManager {
    private projectAbsolutePath: string;

    constructor() {
        this.projectAbsolutePath = '';
    }

    public init(): void {
        this.projectAbsolutePath = this.findProjectRoot(__dirname);
    }

    public isExists(relativeFilePath: string): boolean {
        return f.existsSync(this.toProjectAbsolutePath(relativeFilePath));
    }

    public toProjectAbsolutePath(relativePath: string): string {
        /** If relativePath starts with / character then trimming it */
        return p.resolve(this.projectAbsolutePath, relativePath.startsWith('/') ? relativePath.slice(1) : relativePath);
    }

    public readFileContent(projectRelativePath: string): string {
        return f.readFileSync(this.toProjectAbsolutePath(projectRelativePath), 'utf8');
    }

    public listFiles(dirPath: string): string[] {
        return f.readdirSync(this.toProjectAbsolutePath(dirPath));
    }

    public readClassContent(classPath: string): string {
        const fullClassPath = this.toProjectAbsolutePath(classPath);

        if (!['.ts', '.js'].includes(p.extname(fullClassPath)) || !f.statSync(fullClassPath).isFile()) {
            throw new Error(`Invalid file extension!\nPath: ${fullClassPath}`);
        }

        return this.readFileContent(classPath);
    }

    public async createClassInstance<T>(classPath: string, classType: Class<T>): Promise<T> {
        classPath = this.toProjectAbsolutePath(classPath);
        const imported = await import(classPath);
        if (!imported.default || !(imported.default.prototype instanceof classType)) {
            throw new Error(`Class definition error!\nPath: ${classPath}`);
        }

        return new imported.default();
    }

    private findProjectRoot(directory: string): string {
        if (!directory.endsWith('navi-express') && f.existsSync(p.join(directory, 'package.json'))) {
            return directory;
        }

        const parentDirectory = p.dirname(directory);
        if (parentDirectory === directory) {
            throw new Error('Project root with package.json not found');
        }

        return this.findProjectRoot(parentDirectory);
    }
}
