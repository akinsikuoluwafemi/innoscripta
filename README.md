# My React App

This project is a React TypeScript application built with Vite. Below are instructions for running the project within a Docker container.

## Prerequisites

- Docker installed on your machine

## Build and Run the Docker Container

1. **Build the Docker Image**:

   Run the following command in the root directory of the project:

   ```bash
   docker build -t my-react-app .

   ```

2. **Run the Docker image**:

   `docker run -d -p 3000:80 my-react-app`

3: Then Open http://localhost:3000/
to have a look.

4: **Stopping the container**:
Get the docker id first
`docker ps`.

      docker stop <container_id>

## To run locally
1: you must add a .env file in the root of the app
```
VITE_NEWS_API_KEY=xxx
VITE_GUARDIAN_API_KEY=xxx
VITE_NYT_API_KEY=xxx
```
2: npm install or yarn install

3: npm run dev
