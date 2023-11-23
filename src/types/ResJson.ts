export default class ResJson extends Response {
    constructor(body: object) {
        super(JSON.stringify(body));
    }
}
