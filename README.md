# System Design

This is an overview of our application that how our technologies work to build the scalable chat application which can handle huge volumes of users concurrently.

![alt text](https://api.vecna.online/host/chatdesign.png)
## Set Up this project

You have to setup kafka, postgres and redis either locally or shoud use some online service provider like aiven etc. 

configure kafka, postgres and redis connection and `make sure to create the MESSAGE topic in kafka`.

Run the Prisma commands to setup database 
```sh
cd apps/api_server/prisma
npx prisma generate
npx prisma migrate dev --name 1.0.0
```

Run the TurboRepo command to run Web, api_server, socket_server all at once
```sh
yarn dev
```