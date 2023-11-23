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

export default class Event {
    private isPropagationEnabled: boolean = true;

    public isPropagating(): boolean {
        return this.isPropagationEnabled;
    }

    /**
     * Prevents further execution of event handlers for the current event.
     * If multiple handlers are assigned to the same eventType, calling this method will ensure
     * that no subsequent handlers are triggered.
     */
    public stopPropagation(): void {
        this.isPropagationEnabled = false;
    }
}
