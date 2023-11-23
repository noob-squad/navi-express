export default class Bag<T> {
    private bag: {[key: string]: T} = {};

    public set(key: string, value: T): void {
        this.bag[key] = value;
    }

    public get(key: string, defaultValue: T | null = null): T | null {
        if (!this.exists(key)) return defaultValue;
        return this.bag[key];
    }

    public exists(key: string): boolean {
        return this.bag[key] !== undefined;
    }
}
