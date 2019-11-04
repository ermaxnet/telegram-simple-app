import { BehaviorSubject } from "rxjs";
import { ReactiveStateEventType } from "../enums";
import { ApplicationState, ReactiveStateEvent } from "../models";

export class ReactiveStateModule {
    get eventsEmitter$() {
        return this.eventsEmitter.asObservable();
    }

    constructor(initialState) {
        Object.assign(this, {
            state: initialState || new ApplicationState()
        });

        this.eventsEmitter = new BehaviorSubject();
    }

    logIn() {
        if (this.state.isAuth) {
            return;
        }

        this.state.isAuth = true;

        this.eventsEmitter.next(new ReactiveStateEvent({
            eventType: ReactiveStateEventType.UpdateAuthentication,
            applicationState: this.state
        }));
    }

    logOut() {
        if (!this.state.isAuth) {
            return;
        }
        
        this.state.isAuth = false;

        this.eventsEmitter.next(new ReactiveStateEvent({
            eventType: ReactiveStateEventType.UpdateAuthentication,
            applicationState: this.state
        }));
    }

    dispose() {
        this.eventsEmitter.complete();
    }
}
