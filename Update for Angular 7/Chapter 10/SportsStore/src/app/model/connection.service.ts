import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ConnectionService {
    private connEvents: Subject<boolean>;
        
    constructor() {
        this.connEvents = new Subject<boolean>();
        window.addEventListener("online", 
            (e) => this.handleConnectionChange(e));
        window.addEventListener("offline", 
            (e) => this.handleConnectionChange(e));
    }

    private handleConnectionChange(event) {
        this.connEvents.next(this.connected);
    }
 
    get connected() : boolean {
        return window.navigator.onLine;
    }

    get Changes(): Observable<boolean> {
        return this.connEvents;
    }
}
