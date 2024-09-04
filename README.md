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
