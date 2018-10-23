import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: "td[applyColor]"
})
export class PaCellColor {

    @HostBinding("class")
    bgClass: string = "";

    setColor(dark: Boolean) {
        this.bgClass = dark ? "bg-dark" : "";
    }
}
