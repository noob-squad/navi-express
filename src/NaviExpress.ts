import {Server} from 'bun';
import ConfigManager from './managers/ConfigManager';
import ControllerManager from './managers/ControllerManager';
import FileManager from './managers/FileManager';
import HandlerManager from './managers/HandlerManager';

export default class NaviExpress {
    private fileManager: FileManager;
    private configManager: ConfigManager;
    private controllerManager: ControllerManager;
    private handlerManager: HandlerManager;
    private onInitFinish?: Promise<void>;

    constructor() {
        this.fileManager = new FileManager();
        this.configManager = new ConfigManager(this.fileManager);
        this.controllerManager = new ControllerManager(this.fileManager, this.configManager);
        this.handlerManager = new HandlerManager(this.fileManager, this.configManager);
    }

    public init() {
        this.fileManager.init();
        this.configManager.init();
        this.onInitFinish = (async () => {
            await this.controllerManager.init();
            await this.handlerManager.init();
        })();
    }

    public run() {
        if (!this.onInitFinish) {
            throw new Error('Missing init() call.');
        }

        /** Only starting the server if initialisation finished */
        this.onInitFinish!.then(() => {
            Bun.serve({
                port: Bun.env.PORT!,
                fetch: this.createServeHandler(),
            });

            console.log(`Listening on http://localhost:${Bun.env.PORT!}`);
        });
    }

    private createServeHandler(): (this: Server, request: Request, server: Server) => Response | Promise<Response> {
        return (req: Request) => {
            try {
                const routeOptions = this.controllerManager.getRouteOptions(req);
                const reqEvent = this.handlerManager.handleRequest(req, routeOptions);
                const res = this.controllerManager.processRequest(reqEvent.getRequest());
                return this.handlerManager.handleResponse(res).getResponse();
            } catch (error) {
                return this.handlerManager.handleError(error as Error).getResponse();
            }
        };
    }
}
