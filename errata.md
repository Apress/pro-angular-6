# Errata for *Pro Angular 6*

**All Chapters**

You may encounter problems compiling projects and receive error messages like this:

    ERROR in node_modules/rxjs/internal/types.d.ts(81,44): error TS1005: ';' expected.

There have been breaking changes between the RxJS and Angular packages that mean  the TypeScript compiler can't process the RXJS type definitions correctly. To resolve this problem, edit the `package.json` file to replace this line:

    "rxjs": "^6.0.0",

with this one:

    "rxjs": "6.3.3",

Save the change to the `package.json` file and  run `npm install` to get a version of the RXJS package that won't cause a problem.

This problem is resolved in Angular 7, for which I have provided a free update in this repository.

---


**Chapter 5**

The command to create the example project should be as follows:

    ng new JavaScriptPrimer

(Thanks to David Deboeck for reporting this problem)

---

**Chapter 8**

The `deleteOrder` method in Listing 9-16 deletes all of the orders from the client because it uses the `splice` method on an array without an argument to specify the number of objects to be removed. Use the following implementation of the methods instead:

    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => id == o.id), 1);
        });
    }

(Thanks to Damian Murtha for reporting this problem)

---

**Chapter 10**

The configuiration in Listing 10-2 doesn't cache the Font Awesome files when the application is offline. Use the following configuration instead:

    {
    "index": "/index.html",
    "assetGroups": [{
        "name": "app",
        "installMode": "prefetch",
        "resources": {
        "files": [
            "/favicon.ico",
            "/index.html",
            "/*.css",
            "/*.js",
            "/fontawesome-webfont*"
        ]
        }
    }, {
        "name": "assets",
        "installMode": "lazy",
        "updateMode": "prefetch",
        "resources": {
        "files": [
            "/assets/**"
        ]
        }
    }],
    "dataGroups": [
        {
            "name": "api-product",
            "urls": ["/api/products"],
            "cacheConfig" : {
                "maxSize": 100,
                "maxAge": "5d"
            }
        }],
        "navigationUrls": [
        "/**"
        ]
    }
