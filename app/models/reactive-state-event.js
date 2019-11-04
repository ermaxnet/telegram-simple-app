import { ReactiveStateEventType } from "../enums";
import { ApplicationState } from ".";

export class ReactiveStateEvent {
    eventType = ReactiveStateEventType.None;
    applicationState = new ApplicationState();

    constructor(options) {
        Object.assign(this, options);
    }
}
