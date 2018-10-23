# Updated for Angular 7

All of the examples in the books work unmodified with Angular 7. To upgrade to Angular 7, run the following command:

    npm install --global @angular/cli@7.0.2

This folder contains a complete set of example projects created using Angular 7.

When creating new projects, specify the `--defaults` argument to set up a project with the default configuration. For example, use this command in Chapter 2 to create the example project:

    ng new todo --defaults


## Deprecated Form Feature

There is an obsolete feature in Angular 7 that I use in some of the examples that causes a warning in the browser's JavaScript console. If you want to prevent the errors, then you can use the replacement listings that follow. You can read about the change at https://angular.io/api/forms/FormControlName#use-with-ngmodel.
 (The example projects in this chapter contain the corrected code). 

Listing 14-26:

    import { ApplicationRef, Component } from "@angular/core";
    import { NgForm } from "@angular/forms";
    import { Model } from "./repository.model";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "app",
        templateUrl: "template.html"
    })
    export class ProductComponent {
        model: Model = new Model();
        form: ProductFormGroup = new ProductFormGroup();

        getProduct(key: number): Product {
            return this.model.getProduct(key);
        }

        getProducts(): Product[] {
            return this.model.getProducts();
        }

        newProduct: Product = new Product();

        get jsonProduct() {
            return JSON.stringify(this.newProduct);
        }

        addProduct(p: Product) {
            console.log("New Product: " + this.jsonProduct);
        }

        formSubmitted: boolean = false;

        submitForm(form: NgForm) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);
            this.formSubmitted = true;
            if (form.valid) {
                this.addProduct(this.newProduct);
                this.newProduct = new Product();
                form.reset();
                this.formSubmitted = false;
            }
        }    
    }

Listing 14-27:

    <style>
        input.ng-dirty.ng-invalid { border: 2px solid #ff0000 }
        input.ng-dirty.ng-valid { border: 2px solid #6bc502 }
    </style>

    <form class="m-2" novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">

        <div class="bg-danger text-white p-2 mb-2" *ngIf="formSubmitted && form.invalid">
            There are problems with the form
            <ul>
                <li *ngFor="let error of form.getFormValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <div class="form-group">
            <label>Name</label>
            <input class="form-control" name="name"
                formControlName="name" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || form.controls['name'].dirty) &&
                        form.controls['name'].invalid">
                <li *ngFor="let error of form.controls['name'].getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <div class="form-group">
            <label>Category</label>
            <input class="form-control" name="name" 
                formControlName="category" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || form.controls['category'].dirty) &&
                        form.controls['category'].invalid">
                <li *ngFor="let error of form.controls['category']
                        .getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <div class="form-group">
            <label>Price</label>
            <input class="form-control" name="price" 
                formControlName="price" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || form.controls['price'].dirty) &&
                    form.controls['price'].invalid">
                <li *ngFor="let error of form.controls['price'].getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <button class="btn btn-primary" type="submit"
            [disabled]="formSubmitted && form.invalid"
            [class.btn-secondary]="formSubmitted && form.invalid">
                Create
        </button>
    </form>

Listing 14-28:

    <style>
        input.ng-dirty.ng-invalid { border: 2px solid #ff0000 }
        input.ng-dirty.ng-valid { border: 2px solid #6bc502 }
    </style>

    <form class="m-2" novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">

        <div class="bg-danger text-white p-2 mb-2" *ngIf="formSubmitted && form.invalid">
            There are problems with the form
            <ul>
                <li *ngFor="let error of form.getFormValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <div class="form-group" *ngFor="let control of form.productControls">
            <label>{{control.label}}</label>
            <input class="form-control" 
                name="{{control.modelProperty}}"
                formControlName="{{control.modelProperty}}" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || control.dirty) && control.invalid">
                <li *ngFor="let error of control.getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>

        <button class="btn btn-primary" type="submit"
            [disabled]="formSubmitted && form.invalid"
            [class.btn-secondary]="formSubmitted && form.invalid">
                Create
        </button>
    </form>

Listing 15-1:

    <style>
        input.ng-dirty.ng-invalid { border: 2px solid #ff0000 }
        input.ng-dirty.ng-valid { border: 2px solid #6bc502 }
    </style>
    <div class="row m-2">
        <div class="col-6">
        <form novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">
            <div class="form-group" *ngFor="let control of form.productControls">
            <label>{{control.label}}</label>
            <input class="form-control"
                    name="{{control.modelProperty}}"
                    formControlName="{{control.modelProperty}}" />
            <ul class="text-danger list-unstyled"
                *ngIf="(formSubmitted || control.dirty) && control.invalid">
                <li *ngFor="let error of control.getValidationMessages()">
                {{error}}
                </li>
            </ul>
            </div>
            <button class="btn btn-primary" type="submit"
                    [disabled]="formSubmitted && !form.valid"
                    [class.btn-secondary]="formSubmitted && form.invalid">
            Create
            </button>
        </form>
        </div>
    
        <div class="col-6">
        <table class="table table-sm table-bordered table-striped">
            <tr><th></th><th>Name</th><th>Category</th><th>Price</th></tr>
            <tr *ngFor="let item of getProducts(); let i = index">
            <td>{{i + 1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.category}}</td>
            <td>{{item.price}}</td>
            </tr>
        </table>
        </div>
    </div>

Listing 15-2:

    import { ApplicationRef, Component } from "@angular/core";
    import { NgForm } from "@angular/forms";
    import { Model } from "./repository.model";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "app",
        templateUrl: "template.html"
    })
    export class ProductComponent {
        model: Model = new Model();
        form: ProductFormGroup = new ProductFormGroup();

        getProduct(key: number): Product {
            return this.model.getProduct(key);
        }

        getProducts(): Product[] {
            return this.model.getProducts();
        }

        newProduct: Product = new Product();

        get jsonProduct() {
            return JSON.stringify(this.newProduct);
        }

        addProduct(p: Product) {
            this.model.saveProduct(p);
        }

        formSubmitted: boolean = false;

        submitForm(form: NgForm) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);
            this.formSubmitted = true;
            if (form.valid) {
                this.addProduct(this.newProduct);
                this.newProduct = new Product();
                form.reset();
                this.formSubmitted = false;
            }
        }    
    }

Listing 15-4:

    <table class="table table-sm table-bordered table-striped">
        <tr><th></th><th>Name</th><th>Category</th><th>Price</th></tr>
        <tr *ngFor="let item of getProducts(); let i = index"
                [pa-attr]="getProducts().length < 6 ? 'bg-success' : 'bg-warning'"
                [pa-product]="item" (pa-category)="form.get('category').setValue($event)">
            <td>{{i + 1}}</td>
            <td>{{item.name}}</td>
            <td [pa-attr]="item.category == 'Soccer' ? 'bg-info' : null">
                {{item.category}}
            </td>
            <td [pa-attr]="'bg-info'">{{item.price}}</td>
        </tr>
    </table>

Listing 15-6:

    <div class="col-6">

        <div class="form-group bg-info text-white p-2">
            <label>Name:</label>
            <input class="bg-primary text-white" [paModel]="form.get('name').value" 
                (paModelChange)=" form.get('name').setValue($event)" />
        </div>
    
        <table class="table table-sm table-bordered table-striped">
            <tr><th></th><th>Name</th><th>Category</th><th>Price</th></tr>
            <tr *ngFor="let item of getProducts(); let i = index"
                    [pa-attr]="getProducts().length < 6 ? 'bg-success' : 'bg-warning'"
                    [pa-product]="item" (pa-category)="form.get('category').setValue($event)">
                <td>{{i + 1}}</td>
                <td>{{item.name}}</td>
                <td [pa-attr]="item.category == 'Soccer' ? 'bg-info' : null">
                    {{item.category}}
                </td>
                <td [pa-attr]="'bg-info'">{{item.price}}</td>
            </tr>
        </table>
        
               
    </div>

Listing 15-19 can no longer be applied because the way I set up the example is no longer valid.

Listing 15-21:

    <div class="col-6">

        <div class="form-group bg-info text-white p-2">
            <label>Name:</label>
            <input class="bg-primary text-white" [paModel]="form.get('name').value" 
                (paModelChange)=" form.get('name').setValue($event)" #paModel="paModel" />
            <div class="bg-primary text-white">Direction: {{paModel.direction}}</div>                
        </div>
    
        <table class="table table-sm table-bordered table-striped">
            <tr><th></th><th>Name</th><th>Category</th><th>Price</th></tr>
            <tr *ngFor="let item of getProducts(); let i = index"
                    [pa-attr]="getProducts().length < 6 ? 'bg-success' : 'bg-warning'"
                    [pa-product]="item" (pa-category)="form.get('category').setValue($event)">
                <td>{{i + 1}}</td>
                <td>{{item.name}}</td>
                <td [pa-attr]="item.category == 'Soccer' ? 'bg-info' : null">
                    {{item.category}}
                </td>
                <td [pa-attr]="'bg-info'">{{item.price}}</td>
            </tr>
        </table>
                       
    </div>

Listing 16-15. Omit `ngModel` from the `input` element.

Listing 16-17:

    import { ApplicationRef, Component } from "@angular/core";
    import { NgForm } from "@angular/forms";
    import { Model } from "./repository.model";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "app",
        templateUrl: "template.html"
    })
    export class ProductComponent {
        model: Model = new Model();
        form: ProductFormGroup = new ProductFormGroup();

        getProduct(key: number): Product {
            return this.model.getProduct(key);
        }

        getProducts(): Product[] {
            return this.model.getProducts();
        }

        newProduct: Product = new Product();

        addProduct(p: Product) {
            this.model.saveProduct(p);
        }

        deleteProduct(key: number) {
            this.model.deleteProduct(key);
        }

        formSubmitted: boolean = false;

        submitForm(form: NgForm) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);        
            this.formSubmitted = true;
            if (form.valid) {
                this.addProduct(this.newProduct);
                this.newProduct = new Product();
                form.reset();
                this.formSubmitted = false;
            }
        }

        showTable: boolean = true;
    }

Listing 17-14:

    import { Component, Output, EventEmitter } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html"
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        @Output("paNewProduct")
        newProductEvent = new EventEmitter<Product>();

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);                
            this.formSubmitted = true;
            if (form.valid) {
                this.newProductEvent.emit(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 17-15:

    <form novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">
        <div class="form-group" *ngFor="let control of form.productControls">
            <label>{{control.label}}</label>
            <input class="form-control" 
                name="{{control.modelProperty}}"
                formControlName="{{control.modelProperty}}" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || control.dirty) && !control.valid">
                <li *ngFor="let error of control.getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>
        <button class="btn btn-primary" type="submit"
            [disabled]="formSubmitted && !form.valid"
            [class.btn-secondary]="formSubmitted && !form.valid">
                Create
        </button>
    </form>

Listing 17-22:

    import { Component, Output, EventEmitter } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        styles: ["div { background-color: lightgreen }"]
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        @Output("paNewProduct")
        newProductEvent = new EventEmitter<Product>();

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);                
            this.formSubmitted = true;
            if (form.valid) {
                this.newProductEvent.emit(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 17-24:

    import { Component, Output, EventEmitter } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        styleUrls: ["productForm.component.css"]
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        @Output("paNewProduct")
        newProductEvent = new EventEmitter<Product>();

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);

            this.formSubmitted = true;
            if (form.valid) {
                this.newProductEvent.emit(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 17-25:

    import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        styleUrls: ["productForm.component.css"],
        encapsulation: ViewEncapsulation.Emulated    
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        @Output("paNewProduct")
        newProductEvent = new EventEmitter<Product>();

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);

            this.formSubmitted = true;
            if (form.valid) {
                this.newProductEvent.emit(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 19-14:

    <form novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">
        <div class="form-group" *ngFor="let control of form.productControls">
            <label>{{control.label}}</label>
            <input class="form-control" 
                name="{{control.modelProperty}}"
                formControlName="{{control.modelProperty}}" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || control.dirty) && !control.valid">
                <li *ngFor="let error of control.getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>
        <button class="btn btn-primary" type="submit"
            [disabled]="formSubmitted && !form.valid"
            [class.btn-secondary]="formSubmitted && !form.valid">
                Create
        </button>
    </form>
    <paDiscountEditor></paDiscountEditor>
    <paDiscountDisplay></paDiscountDisplay>

Listing 19-27:

    import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";
    import { Model } from "./repository.model";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        //styleUrls: ["productForm.component.css"],
        //encapsulation: ViewEncapsulation.Emulated
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        constructor(private model: Model) { }

        //@Output("paNewProduct")
        //newProductEvent = new EventEmitter<Product>();

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);
            this.formSubmitted = true;
            if (form.valid) {
                //this.newProductEvent.emit(this.newProduct);
                this.model.saveProduct(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 20-26:

    <form novalidate [formGroup]="form" (ngSubmit)="submitForm(form)">
        <div class="form-group" *ngFor="let control of form.productControls">
            <label>{{control.label}}</label>
            <input class="form-control" 
                name="{{control.modelProperty}}"
                formControlName="{{control.modelProperty}}" />
            <ul class="text-danger list-unstyled"
                    *ngIf="(formSubmitted || control.dirty) && !control.valid">
                <li *ngFor="let error of control.getValidationMessages()">
                    {{error}}
                </li>
            </ul>
        </div>
        <button class="btn btn-primary" type="submit"
            [disabled]="formSubmitted && !form.valid"
            [class.btn-secondary]="formSubmitted && !form.valid">
                Create
        </button>
    </form>
    <div class="bg-info text-white m-2 p-2">
        View Child Value: <span paDisplayValue></span>
    </div>
    <div class="bg-info text-white m-2 p-2">
        Content Child Value: <ng-content></ng-content>
    </div>

Listing 20-27:

    import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";
    import { Model } from "./repository.model";
    import { VALUE_SERVICE } from "./valueDisplay.directive";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        providers: [{ provide: VALUE_SERVICE, useValue: "Oranges" }]
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        constructor(private model: Model) { }

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);
            this.formSubmitted = true;
            if (form.valid) {
                this.model.saveProduct(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }

Listing 20-30:

    import {
        Component, Output, EventEmitter, ViewEncapsulation,
        Inject, SkipSelf
    } from "@angular/core";
    import { Product } from "./product.model";
    import { ProductFormGroup } from "./form.model";
    import { Model } from "./repository.model";
    import { VALUE_SERVICE } from "./valueDisplay.directive";

    @Component({
        selector: "paProductForm",
        templateUrl: "productForm.component.html",
        viewProviders: [{ provide: VALUE_SERVICE, useValue: "Oranges" }]
    })
    export class ProductFormComponent {
        form: ProductFormGroup = new ProductFormGroup();
        newProduct: Product = new Product();
        formSubmitted: boolean = false;

        constructor(private model: Model,
            @Inject(VALUE_SERVICE) @SkipSelf() private serviceValue: string) {
            console.log("Service Value: " + serviceValue);
        }

        submitForm(form: any) {
            this.form.productControls.forEach(c => this.newProduct[c.modelProperty] = c.value);
            this.formSubmitted = true;
            if (form.valid) {
                this.model.saveProduct(this.newProduct);
                this.newProduct = new Product();
                this.form.reset();
                this.formSubmitted = false;
            }
        }
    }
