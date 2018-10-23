import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import { ConnectionService } from "../model/connection.service";

@Component({
    templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {
    public connected: boolean = true;

    constructor(public cart: Cart, private connection: ConnectionService) { 
        this.connected = this.connection.connected;
        connection.Changes.subscribe((state) => this.connected = state);
    }
}
