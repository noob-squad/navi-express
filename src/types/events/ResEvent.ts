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
