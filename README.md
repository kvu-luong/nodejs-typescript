## 1. Setup

1. install library
2. set rule for typescript

   ```
   npx tsc --init
   ```

   in tsconfig.json

3. For Dev we need to run to script below

```
yarn watch : => to tracking and compile ts to js
yarn dev : => to run node server after being compled in js
```

4. setup prettier

- .prettierrc file : content in pretter play ground

* ctrl shift p: to set up format type in vscode

  win: shift alt f

  ubuntu: ctrl shift i

-

```
yarn add -D prettier
```

add **.pretterignore** file to ignore some file that don't need to format

5. husky

- pre-comit
- comit-msg

```
git init -> in pre configure
yarn add husky -D
npx mrm@2 lint-staged -> to rewrite after format code 'git add .' with pretter
```

convention checking for git commit message

```
yarn add @commitlint/config-conventional @commitlint/cli
```

then create and copy content file commitlint.config.js to write rule of commit
next, we enable husky commit message

```
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
or
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

rules document: https://commitlint.js.org/#/reference-rules

6. setup engine to only run yarn
- create file .nvmrc
```
node -v > .nvmrc
```
- create file .npmrc
- setup engine in package.json

7. Alias typescript

    - Adding **baseUrl** and **paths** in compilesOption in tsconfig.json
    - Adding script in package.json
    - Install module-alias
    - Import module-alias in start up file: 'index.ts'

## 2. Start Coding

***Flow code:***
type -> schema -> model ( connect db) -> service ( handle with db) -> controller ( logic) => map to route

1. Tutorial: https://www.youtube.com/watch?v=BWUi6BS9T5Y&t=0s 
2. Conect Mongodb
3. Log with pino

    in .gitignore need to write rule 'logs' before git add to prevent overwrite rule ignore

4. Route

     Differences between import and require:

    **require** for express library,  but we need to use **import** for type express
5. Schema with zod : https://zod.dev/?id=type-inference 

6. To do by myself base of this video
connect mongdb
log with pino
using joi instead of zod to validate param input to api: object: ok, object

***testing with postman: pre-request, test: https://learning.postman.com/docs/writing-scripts/pre-request-scripts/

***create jwt with private/public key
- generate key with openssl: 
```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

```

using middleware to validate token (role later): OK
api create/ get / update / delete product with role,

*** api  create multiple product

input schema like this:
```
{
    "list": [
        {
            "name": "haah",
            "quantity": 123
        }
    ]
}
```

api register / login ( refresh token in cookie ): OK
using lodash: OK

using bulder pattern to response: https://www.youtube.com/watch?v=M7Xi1yO_s8E&list=LL&index=39 : OK

tutoral: https://www.youtube.com/watch?v=BWUi6BS9T5Y

