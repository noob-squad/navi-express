import {ResAny} from '../types';
import ReqEvent from './ReqEvent';

export default class ResEvent extends ReqEvent {
    private res: ResAny;
    protected isForcedResponse: boolean = false;

    constructor(reqEvent: ReqEvent, res: ResAny) {
        super(reqEvent.getRequest(), reqEvent.getRequestType(), reqEvent.getRouteOptions());
        this.res = res;
    }

    public getResponse(): ResAny {
        return this.res;
    }

    public setResponse(res: ResAny) {
        this.res = res;
        this.stopPropagation();
        this.isForcedResponse = true;
    }
}
