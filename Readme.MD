# Learn Caching Using Node JS
Using node -v => 12.22.11

## The ways of caching
1. Server response ETag Headers to Client
2. Client make request again but with header If-None-Match
3. Server validating value If-None-Match Then response with the ETag if exist or new ETag if not exist
Reference: https://stackoverflow.com/questions/24542959/how-does-a-etag-work-in-expressjs

## Implementation of caching
- Using internal caching use npm library [node-cache](https://github.com/node-cache/node-cache)

Next will get updated the implementation of caching using different method