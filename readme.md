# Security Checker

A middleware methods to checking the request with criteria, such as
1. If this HTTP method is GET and path is /shopback/resource, please modify path to
/shopback/static/assets
2. If this HTTP method is GET and path is /shopback/me, please check if sbcookie
Cookie exists in header. Throw an error if not existing.
3. If this HTTP method is GET, please check if referer header is belong to
www.shopback.com. Throw an error if it is invalid.
4. If this HTTP method is GET and path is match /shopback/api/*, please add From in the
header and the value is hello@shopback.com.
5. If this HTTP method is POST/PUT, please remove all the url query string.
6. If this HTTP method is POST/PUT, please check if X-SHOPBACK-AGENT exists in
header. Throw an error if not existing.
7. If this HTTP method is POST/PUT, please check if Content-Type exists in header and
the value should be “application/json”. Throw error if it is invalid.
8. If this HTTP method is DELETE, please check if X-SHOPBACK-AGENT exists in
header and the value should be “AGENT_1” only. Throw error if it is invalid.
9. This library should add X-SHOPBACK-TIMESTAMP in the header for all HTTP
requests, the value is current timestamp.
10. This library only handles the domain from www.shopback.com. Throw an error if it is
invalid.

## APIs


