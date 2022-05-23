# Learn Caching Using Node JS
Using node -v => v16.14.2

## The ways of caching
1. Server response x-cache-key Headers to Client
2. Client make request again but with header If-None-Match
3. Server validating value If-None-Match Then response with the x-cache-key if exist or new x-cache-key if not exist
Reference: https://stackoverflow.com/questions/24542959/how-does-a-etag-work-in-expressjs

## Implementation of caching
- Using internal caching npm library [node-cache](https://github.com/node-cache/node-cache)
- Using redis npm library

Next will get updated the implementation of caching using different method