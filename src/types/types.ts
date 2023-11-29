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

import Bag from './Bag';
import ErrHandler from './handlers/ErrHandler';
import ReqHandler from './handlers/ReqHandler';
import ResHandler from './handlers/ResHandler';
import ResJson from './ResJson';

export type ResAny = Response | ResJson;
export type RouteHandler = (req: Request) => ResAny | Promise<ResAny>;
export type RouteData = {handler: RouteHandler; options: Bag<string>};
export type RouteMap = {[path: string]: {[method: string]: RouteData | undefined}};
export type HandlerMap = {onRequest: ReqHandler[]; onResponse: ResHandler[]; onError: ErrHandler[]};
export type HandlerConfig = {path: string};
export type ControllerConfig = {path: string};
export type Class<T> = {new (): T};
