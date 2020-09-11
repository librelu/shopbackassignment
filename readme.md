# Security Checker

A middleware methods to checking the request with criteria, such as

| Topic                                                      | API                                         | Description                                                                                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| redirect to asset                                          | redirectToAssetsMiddleware()                | 1. If this HTTP method is GET and path is /shopback/resource, please modify path to /shopback/static/assets                                                 |
| cookie matcher                                             | cookieMatcherMiddleware()                   | 2. If this HTTP method is GET and path is /shopback/me, please check if sbcookie Cookie exists in header. Throw an error if not existing.                   |
| Domain name checker                                        | domainNameCheckerMiddleware()               | 3. If this HTTP method is GET, please check if referer header is belong to www.shopback.com. Throw an error if it is invalid.                               |
| add from to header                                         | addFromMiddleware                           | 4. If this HTTP method is GET and path is match /shopback/api/\*, please add From in the header and the value is hello@shopback.com.                        |
| Trim Query String                                          | trimQueryStringMiddleware()                 | 5. If this HTTP method is POST/PUT, please remove all the url query string.                                                                                 |
| ShopBack agent checker                                     | shopBackAgentCheckerMiddleware()            | 6. If this HTTP method is POST/PUT, please check if X-SHOPBACK-AGENT exists in header. Throw an error if not existing.                                      |
| Check `application/json` in content-type header            | isJSONApplicationCheckerMiddleware()        | 7. If this HTTP method is POST/PUT, please check if Content-Type exists in header and the value should be “application/json”. Throw error if it is invalid. |
| Check X-SHOPBACK-AGENT existed in header in DELETE Request | xShopbackAgentWhenDeleteCheckerMiddleware() | 8. If this HTTP method is DELETE, please check if X-SHOPBACK-AGENT exists in header and the value should be “AGENT_1” only. Throw error if it is invalid    |
| Timestamp checker with range                               | shopbackTimeStampCheckerMiddleware()        | 9. This library should add X-SHOPBACK-TIMESTAMP in the header for all HTTP requests, the value is current timestamp.                                        |
| Check is domain name correct in any method                 | shopbackDomainCheckerMiddleware()           | 10. This library only handles the domain from www.shopback.com. Throw an error if it is invalid.                                                            |

## How to setup

1. Install related package `npm install`
2. Run test `npm run test`

## How to use it

The is a middleware collections package basic on express. Make sure you have install express in node repo. To use the middleware here is the example code.

```javascript
// import current package
// const SecurityChecker = require('..');
let options = {};
let SecurityChecker = SecurityChecker.MiddlewareProvider(options);
app.use('example_path', SecurityChecker.redirectToAssetsMiddleware);
```

Above code is using middleware when each time client side requesting `example_path`

### Customize rules

The rules can customize by options. The options is a constructor params when new a `MiddlewareProvider`. Here is the options keys:

| constructor key | description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| shopbackAgent   | change shopback agent checking rule, default: AGENT_1                         |
| cookieChecker   | checking cookie key and value if set, default: checking the cookie is existed |

example for customize rule:

```javascript
// import current package
// const SecurityChecker = require('..');
let options = {
  shopbackAgent: 'AGENT_2',
  cookieChecker: { token: '9af3f722855142a7901ce8ed5a8ec664' },
};
let SecurityChecker = SecurityChecker.MiddlewareProvider(options);
app.use('example_path', SecurityChecker.redirectToAssetsMiddleware);
```
