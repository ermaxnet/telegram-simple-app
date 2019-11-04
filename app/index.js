import { ReactiveStateModule } from "./modules/reactive-state";
import { ReactiveStateEventType } from "./enums"; 
import { filter } from "rxjs/operators";

const state = new ReactiveStateModule();

const root = document.getElementById("root");

state.eventsEmitter$.pipe(
    filter(event => event && event.eventType === ReactiveStateEventType.UpdateAuthentication)
).subscribe(event => {
    const state = event.applicationState;

    if (state.isAuth) {
        const span = document.createElement("span");
        span.id = "a";
        span.innerText = "Authenticated";
        root.appendChild(span);
    } else {
        const span = document.getElementById("a");

        if (span) {
            span.remove();
        }
    }
});

const buttonIn = document.createElement("button");
buttonIn.innerText = "In";
buttonIn.addEventListener("click", () => {
    state.logIn();
});

const buttonOut = document.createElement("button");
buttonOut.innerText = "Out";
buttonOut.addEventListener("click", () => {
    state.logOut();
});

root.append(buttonIn, buttonOut);

