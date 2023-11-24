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

import Controller from 'types/Controller';
import {RouteMap, ResAny} from 'types/types';
import ConfigManager from './ConfigManager';
import FileManager from './FileManager';
import Bag from 'types/Bag';

export default class ControllerManager {
    private routeMap: RouteMap;

    private configManager: ConfigManager;
    private fileManager: FileManager;

    constructor(fileManager: FileManager, configManager: ConfigManager) {
        this.configManager = configManager;
        this.fileManager = fileManager;
        this.routeMap = {};
    }

    public async init(): Promise<void> {
        this.routeMap = {};
        await this.loadControllers();
    }

    public getRouteOptions(req: Request): Bag<string> {
        const path = new URL(req.url).pathname;
        const method = req.method;
        if (!this.routeMap[path] || !this.routeMap[path]![method]) {
            return new Bag<string>();
        }
        return this.routeMap[path]![method]!.options;
    }

    public processRequest(req: Request): ResAny {
        const path = new URL(req.url).pathname;
        const method = req.method;
        if (!this.routeMap[path]) {
            throw new Error('Not Found.');
        }
        if (!this.routeMap[path]![method]) {
            throw new Error('Method Not Allowed.');
        }
        return this.routeMap[path]![method]!.handler(req);
    }

    private async loadControllers() {
        const controllerDirPath = this.configManager.getControllersPath();
        const controllerFiles = this.fileManager.listFiles(controllerDirPath);

        for (const file of controllerFiles) {
            const classPath = `${controllerDirPath}/${file}`;
            const classContent = this.fileManager.readClassContent(classPath);
            const classInstance = await this.fileManager.createClassInstance(classPath, Controller);

            this.loadPathHandlers(classContent, classInstance);
        }
    }

    private loadPathHandlers(classContent: string, classInstance: Controller) {
        const regex =
            /@Route\(\s*['"](\S+?)['"](?:\s*,\s*(method|name)\s*=\s*['"]([A-Za-z0-9_-]+?)['"])?(?:\s*,\s*(method|name)\s*=\s*['"]([A-Za-z0-9_-]+?)['"])?\s*\)(?:[\s\S]*?^[\s\S]*?)(?:^|.*\s+)([A-Za-z0-9_$]+)\(/gm;

        let match;
        while ((match = regex.exec(classContent)) !== null) {
            const path: string = match[1]!;
            const functionName: string = match[match.length - 1]!;
            const options = new Bag<string>();

            if (!path && !functionName) throw new Error(`Path handler parse error!\nPath: ${path}`);

            options.set('name', path);

            if (match[2] && !match[4]) {
                if (match[2].toLowerCase() === 'method') options.set('method', match[3]!.toUpperCase());
                else options.set('name', match[3]!);
            } else if (match[2] && match[4]) {
                if (match[2] === match[4]) throw new Error(`Path handler duplicated params!\nPath: ${path}`);
                if (match[2].toLowerCase() === 'method') {
                    options.set('method', match[3]!.toUpperCase());
                    options.set('name', match[5]!);
                } else {
                    options.set('method', match[5]!.toUpperCase());
                    options.set('name', match[3]!);
                }
            }

            if (!this.routeMap[path]) this.routeMap[path] = {};
            ['GET', 'POST', 'PATCH', 'DELETE'].forEach(m => {
                if (options.exists('method') && options.get('method') !== m) return;
                this.routeMap[path]![m] = {handler: classInstance[functionName]!, options};
            });
        }
    }
}
