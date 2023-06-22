# node-e-commerce

Develop a server-side application and complete the following tasks:

Develop a jwt token based authentication and authorization
Develop APIs to server CRUD functionality for products. (filter by name, price api)
Develop CRUD functionality for User Profile Management.
Develop CRUD functionality for Product Categories and map with products.

## Clone this Repo

Clone the repo by following the command

```
git clone https://github.com/aadityajha1/node-ecommerce.git
```

## Create a new branch

Create a new branch by your name

```
git checkout -b new_branch
```

### Using docker

Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
Then run following command in your terminal to build and start the docker container

    docker-compose  up -d --build

#### Database credentials

| key      | value             |
| -------- | ----------------- |
| port     | 5432              |
| host     | node_ecommerce_db |
| name     | ecommerce         |
| user     | root              |
| password | root              |
