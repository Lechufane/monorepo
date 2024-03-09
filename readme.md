## Blogger monorepo

This repository is a monorepo containing a backend and frontend for a blogger application:

### Backend (blogger-back):

apis: This folder contains 2 Go projects that act as APIs for your application.
middlend: This Go project serves as a middleware component for the backend.

### Frontend (blogger-front):

This folder contains a Next.js project that serves as the user interface for the blogger application.

### Prerequisites:

- Docker and Docker Compose (refer to https://docs.docker.com/get-docker for installation instructions) **this should be the only thing you need to install** to run the project.
- **It's also important to have the docker daemon running** you can do this in linux by running `sudo systemctl start docker` and in windows by running the docker desktop app.
- Go 1.x (refer to https://go.dev/doc/install for installation instructions)
- Node.js and npm (refer to https://nodejs.org/en for installation instructions)
- Clone the repository:

```
git clone https://https://docs.github.com/articles/cloning-a-repository

```

Navigate to the root directory of the repository:

```
cd [monorepo]
docker-compose up -d
```

The docker-compose.yml file (if present) might define how dependencies are installed and managed for each service. Refer to the specific instructions within the docker-compose.yml file for details on running the projects using Docker Compose. This might involve a command like docker-compose up -d to start all services in the background.

Migrations
The initdb.sql file contains the initial database schema for your projects. To apply the migrations, just run the docker-compose command and it should run the automatically.

## Improvements

    -   I'm currently working in a login and register system for the backend.

## License

This project is licensed under the [License Name] license. See the LICENSE file for details.

## Additional Information

Feel free to add any further details specific to your project, such as:

- Links to project documentation (if any).
- Troubleshooting tips.
- Testing instructions.
- Consider including a section on how the backend and frontend interact (if applicable).

### Contact information for developers www.diegovillafane.com.
