import Bag from '../Bag';
import Event from './Event';

enum ReqType {
    MAIN_REQ = 1,
    SUB_REQ = 2,
}

export default class ReqEvent extends Event {
    static readonly ReqType = ReqType;

    private req: Request;
    private reqType: ReqType;
    private routeOptions: Bag<string>;

    constructor(req: Request, reqType: ReqType, routeOptions: Bag<string>) {
        super();
        this.req = req;
        this.reqType = reqType;
        this.routeOptions = routeOptions;
    }

    public getRequest(): Request {
        return this.req;
    }

    public getRequestType(): ReqType {
        return this.reqType;
    }

    public getRouteOptions(): Bag<string> {
        return this.routeOptions;
    }

    public isMainRequest(): boolean {
        return this.reqType === ReqType.MAIN_REQ;
    }

    public isSubRequest(): boolean {
        return this.reqType === ReqType.SUB_REQ;
    }
}
