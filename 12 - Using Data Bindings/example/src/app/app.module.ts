import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component';
import { ProductComponent } from "./component";

@NgModule({
    declarations: [ProductComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [ProductComponent]
})
export class AppModule { }
