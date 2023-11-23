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
