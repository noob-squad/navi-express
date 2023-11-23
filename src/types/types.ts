import Bag from './Bag';
import ErrHandler from './handlers/ErrHandler';
import ReqHandler from './handlers/ReqHandler';
import ResHandler from './handlers/ResHandler';
import ResJson from './ResJson';

export type ResAny = Response | ResJson;
export type PathHandler = (req: Request) => ResAny;
export type RouteData = {handler: PathHandler; options: Bag<string>};
export type RouteMap = {[path: string]: {[method: string]: RouteData | undefined}};
export type HandlerMap = {onRequest: ReqHandler[]; onResponse: ResHandler[]; onError: ErrHandler[]};
export type HandlerConfig = {path: string};
export type ControllerConfig = {path: string};
export type Class<T> = {new (): T};
