### Blogger monorepo

This repository is a monorepo containing a backend and frontend for a blogger application:

## Backend (blogger-back):

apis: This folder contains 2 Go projects that act as APIs for your application.
middlend: This Go project serves as a middleware component for the backend.

## Frontend (blogger-front):

This folder contains a Next.js project that serves as the user interface for the blogger application.

[Your Monorepo Name]
This repository is a monorepo containing a backend and frontend for a blogger application:

Backend (blogger-back):
apis: This folder contains 2 Go projects that act as APIs for your application.
middlend: This Go project serves as a middleware component for the backend.
Frontend (blogger-front): This folder contains a Next.js project that serves as the user interface for the blogger application.
Getting Started
Prerequisites:

Go 1.x (refer to https://go.dev/doc/install for installation instructions)
Node.js and npm (refer to https://nodejs.org/en for installation instructions)
Clone the repository:

```
git clone https://https://docs.github.com/articles/cloning-a-repository
Usa el código con precaución.
Setup:
```

Navigate to the root directory of the repository:

```
cd [monorepo]
Usa el código con precaución.
(Optional, if not using Docker Compose): Install dependencies for the backend Go projects:
Bash
cd blogger-back/apis
go mod download
cd ../middlend
go mod download
Usa el código con precaución.
(Optional, if not using Docker Compose): Install dependencies for the frontend Next.js project:
Bash
cd blogger-front
npm install
Usa el código con precaución.
Running the Projects
Without Docker Compose:

Backend: Follow the manual installation steps mentioned in the "Getting Started" section to install dependencies for each Go project (if not using Docker Compose). Then, navigate to the specific API project directory and run go run main.go to start the application.
Frontend: Navigate to the blogger-front directory and run npm install to install dependencies (if not using Docker Compose), followed by npm run dev to start the development server. This will typically start the server on http://localhost:3000 by default (you can check the output for the specific port).
With Docker Compose (if applicable):

The docker-compose.yml file (if present) might define how dependencies are installed and managed for each service. Refer to the specific instructions within the docker-compose.yml file for details on running the projects using Docker Compose. This might involve a command like docker-compose up -d to start all services in the background.

Migrations
The initdb.sql file contains the initial database schema for your projects. To apply the migrations, follow these steps (modify based on your setup):

Run a database container (e.g., with Docker Compose).
Connect to the database using your preferred tool.
Execute the initdb.sql script within your database client.
Contributing
We welcome contributions to this project! Please see the CONTRIBUTING.md file (if you have one) for details on how to submit pull requests.

License
This project is licensed under the [License Name] license. See the LICENSE file for details.

Additional Information
Feel free to add any further details specific to your project, such as:
Links to project documentation (if any).
Troubleshooting tips.
Testing instructions.
Consider including a section on how the backend and frontend interact (if applicable).
Contact information for developers (optional).
```
