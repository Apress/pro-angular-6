# Errata for *Pro Angular 6*

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
