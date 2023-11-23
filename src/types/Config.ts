import {ControllerConfig, HandlerConfig} from './types';

export default interface Config {
    controllers?: ControllerConfig;

    handlers?: {
        onError?: [HandlerConfig];
        onRequest?: [HandlerConfig];
        onResponse?: [HandlerConfig];
    };
}
