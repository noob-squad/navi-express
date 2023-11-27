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

import Config from 'types/Config';
import {HandlerConfig} from 'types/types';
import FileManager from './FileManager';

export default class ConfigManager {
    private config: Config;
    private fileManager: FileManager;

    constructor(fileManager: FileManager) {
        this.config = {};
        this.fileManager = fileManager;
    }

    public init(): void {
        this.config = {};
        const configPath = Bun.env.LUCIDUS_CONFIG ?? '/config/config.json';
        if (this.fileManager.isExists(configPath)) {
            try {
                this.config = JSON.parse(this.fileManager.readFileContent(configPath));
            } catch (e) {
                throw new Error(`Invalid config format. Path: ${configPath}`);
            }
        } else {
            /**
             * If neither a default configuration nor an environment-specific config path is found,
             * then the welcome controller will be used.
             */
            this.config = {controllers: {path: '/welcome'}};
        }
    }

    public getControllersPath(): string {
        return this.config.controllers?.path ?? '/src/controllers';
    }

    public getEventHandlers(): {[eventType: string]: HandlerConfig[]} {
        return {
            onError: this.config.handlers?.onError ?? [],
            onRequest: this.config.handlers?.onRequest ?? [],
            onResponse: this.config.handlers?.onResponse ?? [],
        };
    }
}
