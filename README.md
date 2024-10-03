# My Trading Card Worth

This application is intended to answer a simple question, "How much are your Pokemon cards worth?"

## Getting Started

Since docker hot reloading is not set up with docker compose, its recommended to develop without docker.

#### Start in developer mode

`npm run dev`
visit `http://localhost:3000/`

#### Start with Docker

`docker-compose up`
visit `http://localhost:3000/`

#### Environment Requirements

Environment variables are required for the project to run. Contact an admin to request access to the environment variables.

- `npm run dev` add environment variables to the shell running the program.
- `docker-compose up` add environment variables to a `.env` file in the project.

## Tests

#### Run Unit Tests

`npm run test`
`npm run test:watch`

#### Run Cypress Tests

`npm run cypress`
`npm run cypress:open`

## Add Expansions

Go to mongo database and add a new expansion entry.

1. Make sure the correct card trader id is provided.
1. Make sure the exact text for the series is provided.
1. Refresh Store

## Add Series

Go to mongo database and add series name to expansion order.

1. Add the expansion by following "Add Expansions"
1. Refresh Store
