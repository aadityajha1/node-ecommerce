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

### Using docker [Optional]

Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
Then run following command in your terminal to build and start the docker container

```sh
    docker-compose  up -d --build
```

#### Set environment variables

Copy `.env.example` to `.env` in **MacOS** or **Linux**

```
cp .env.example .env
```

In **Windows**

```
copy .env.example .env
```

And set the following fields in your `.env` according to your configurations

| key           | value             |
| ------------- | ----------------- |
| `PORT`        | `3000`            |
| `DB_PORT`     | `5432`            |
| `DB_HOST`     | `your_host`       |
| `DB_NAME`     | `your_db_name`    |
| `DB_USER`     | `your_user_name`  |
| `DB_PASSWORD` | `your_password`   |
| `SECRET_KEY`  | `your_secret_key` |
