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

import ResJson from '../ResJson';
import {ResAny} from '../types';
import ReqEvent from './ReqEvent';
import ResEvent from './ResEvent';

export default class ErrEvent extends ResEvent {
    private err: Error;

    constructor(prevEvent: ReqEvent | ResEvent, err: Error) {
        // prettier-ignore
        super(prevEvent, typeof (prevEvent as ResEvent).getResponse === 'function'
            ? (prevEvent as ResEvent).getResponse()
            : new Response('')
        );
        this.err = err;
    }

    public getResponse(): ResAny {
        return this.isForcedResponse ? super.getResponse() : ErrEvent.createErrorResponse(this.err);
    }

    public getError(): Error {
        return this.err;
    }

    /**
     * Replaces current error.
     * This error will be thrown if no response is set in the event.
     */
    public setError(err: Error): void {
        this.err = err;
    }

    private static createErrorResponse(error: Error): ResAny {
        return new ResJson({error: error.message});
    }
}
