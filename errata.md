# Errata for *Pro Angular 6*


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
