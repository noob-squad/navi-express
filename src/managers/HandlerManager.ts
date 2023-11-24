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

import ErrHandler from 'types/handlers/ErrHandler';
import ReqHandler from 'types/handlers/ReqHandler';
import ResHandler from 'types/handlers/ResHandler';
import {HandlerConfig, HandlerMap, ResAny} from 'types/types';
import ConfigManager from './ConfigManager';
import FileManager from './FileManager';
import ErrEvent from 'types/events/ErrEvent';
import ReqEvent from 'types/events/ReqEvent';
import ResEvent from 'types/events/ResEvent';
import Bag from 'types/Bag';

export default class HandlerManager {
    private reqEvent!: ReqEvent;
    private resEvent?: ResEvent;
    private errEvent!: ErrEvent;
    private eventHandlers: HandlerMap;

    private configManager: ConfigManager;
    private fileManager: FileManager;

    constructor(fileManager: FileManager, configManager: ConfigManager) {
        this.configManager = configManager;
        this.fileManager = fileManager;
        this.eventHandlers = {onRequest: [], onResponse: [], onError: []};
    }

    public async init(): Promise<void> {
        this.eventHandlers = {onRequest: [], onResponse: [], onError: []};
        await this.loadEventHandlers();
    }

    public handleRequest(req: Request, routeOptions: Bag<string>): ReqEvent {
        this.reqEvent = new ReqEvent(req, ReqEvent.ReqType.MAIN_REQ, routeOptions);
        this.handleEvent(this.eventHandlers.onRequest, this.reqEvent);
        return this.reqEvent;
    }

    public handleResponse(res: ResAny): ResEvent {
        this.resEvent = new ResEvent(this.reqEvent, res);
        this.handleEvent(this.eventHandlers.onResponse, this.resEvent);
        return this.resEvent;
    }

    public handleError(err: Error): ErrEvent {
        this.errEvent = new ErrEvent(this.resEvent ?? this.reqEvent, err);
        this.handleEvent(this.eventHandlers.onError, this.errEvent);
        return this.errEvent;
    }

    private handleEvent<H extends ReqHandler, E extends ReqEvent>(handlers: H[], event: E): void {
        for (const handler of handlers) {
            handler.handle(event);
            if (!event.isPropagating()) break;
        }
    }

    private async loadEventHandlers() {
        const eventHandlers = this.configManager.getEventHandlers();
        for (const eventType in eventHandlers) {
            await this.loadEventHandler(eventType, eventHandlers[eventType]!);
        }
    }

    private async loadEventHandler(eventType: string, eventHandlers: HandlerConfig[]): Promise<void> {
        for (const handler of eventHandlers) {
            switch (eventType) {
                case 'onRequest':
                    this.eventHandlers.onRequest.push(
                        await this.fileManager.createClassInstance(handler.path, ReqHandler)
                    );
                    break;
                case 'onResponse':
                    this.eventHandlers.onResponse.push(
                        await this.fileManager.createClassInstance(handler.path, ResHandler)
                    );
                    break;
                case 'onError':
                    this.eventHandlers.onError.push(
                        await this.fileManager.createClassInstance(handler.path, ErrHandler)
                    );
                    break;
                default:
                    throw Error(`Unsupported event type: ${eventType}`);
            }
        }
    }
}
