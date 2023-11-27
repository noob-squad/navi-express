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

import {Controller, ResAny, ResJson} from '@noob-squad/navi-express';

export default class WelcomeController extends Controller {
    // @Route('/')
    public welcome(): ResAny {
        return new ResJson({
            message: 'Welcome to the NaviExpress Framework!',
            status: 'success',
            data: {
                welcome: 'You have successfully connected to the NaviExpress Framework.',
                nextSteps: "Begin by creating a config file and defining your first Controller. It's quick and easy!",
                tips: 'For detailed guidance on getting started and to learn more about using the framework, please visit our documentation.',
                documentation: 'https://www.npmjs.com/package/@noob-squad/navi-express',
                github: 'https://github.com/noob-squad/navi-express',
            },
        });
    }
}
