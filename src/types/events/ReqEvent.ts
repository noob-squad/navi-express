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
