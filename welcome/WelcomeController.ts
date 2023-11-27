import {Controller, ResAny, ResJson} from '../dist';

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
