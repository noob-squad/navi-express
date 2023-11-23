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
        this.config = JSON.parse(this.fileManager.readFileContent(Bun.env.LUCIDUS_CONFIG ?? '/config/config.json'));
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
