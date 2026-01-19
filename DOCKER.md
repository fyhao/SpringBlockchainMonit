# Docker Setup and Usage

## Docker Hub Repository

The Docker images for this project are automatically built and published to Docker Hub:
- **Repository:** https://hub.docker.com/r/fyhao/springblockchainmonit

## Automated Build and Push

The project uses GitHub Actions to automatically build and push Docker images:

### Triggers
- **Pull Requests:** Builds the Docker image to verify it can be built successfully (no push)
- **Push to main branch:** Builds and pushes the image with tags:
  - `latest` - Latest version from main branch
  - `main-<sha>` - Specific commit SHA from main branch
- **Release tags (v*):** Builds and pushes the image with semantic version tags:
  - `v1.2.3` - Full version
  - `v1.2` - Major.minor version
  - `v1` - Major version

### Setup Instructions

To enable automated Docker builds and pushes, configure the following secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token (create one at https://hub.docker.com/settings/security)

### Workflow File

The Docker automation workflow is defined in `.github/workflows/docker.yml`

## Manual Docker Build

To build the Docker image locally:

```bash
cd BlockchainMonit
docker build -t springblockchainmonit .
```

## Running the Docker Container

To run the container:

```bash
docker pull fyhao/springblockchainmonit:latest
docker run -p 8080:8080 fyhao/springblockchainmonit:latest
```

The application will be available at http://localhost:8080

## Dockerfile Details

The Dockerfile uses a multi-stage build:
1. **Build Stage:** Uses `adoptopenjdk/openjdk11` with Gradle 7.4.2 and Node.js 16.x to build the application
2. **Runtime Stage:** Uses `openjdk:11-jdk` to run the compiled JAR file

The build process skips tests (`-x test`) to speed up the Docker build process.
