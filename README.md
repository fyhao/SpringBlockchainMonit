# Spring Blockchain Monit

A Spring Boot and React dashboard that polls configured blockchain explorers and pushes token price changes to browsers over WebSocket.

## Features

- Live token dashboard over `/priceservice`
- REST API at `/api/tokenlist` for web, Scriptable, and JSBox clients
- English, Simplified Chinese, and Malay UI with persisted language selection
- Java and React unit tests in GitHub Actions
- Container publishing to GitHub Container Registry and, when credentials are configured, Docker Hub
- Deployment definitions for Heroku Container Stack and Google Cloud Run
- Scriptable iOS widget and JSBox workflow clients

## Local development

Requirements: JDK 11 and Node.js 18 or 20.

```bash
cd BlockchainMonit
./gradlew bootRun
```

The Gradle build installs the JavaScript dependencies and bundles React. Run the test suites independently with:

```bash
cd BlockchainMonit
./gradlew test
npm ci
npm test -- --runInBand
```

## Container

Build and run from the repository root:

```bash
docker build -t spring-blockchain-monit .
docker run --rm -p 8080:8080 spring-blockchain-monit
curl http://localhost:8080/api/health
```

Every push to `main` publishes `ghcr.io/fyhao/springblockchainmonit:latest`. To mirror builds to Docker Hub, add repository secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.

## Heroku

The repository uses `heroku.yml` and the container stack:

```bash
heroku create YOUR-APP
heroku stack:set container -a YOUR-APP
git push heroku main
```

Heroku supplies `PORT`; the application and image both honor it.

## Google Cloud Run

Create the `cloud-run-source-deploy` Artifact Registry repository once, then submit the included build:

```bash
gcloud artifacts repositories create cloud-run-source-deploy --repository-format=docker --location=asia-southeast1
gcloud builds submit --config cloudbuild.yaml
```

Override `_SERVICE` or `_REGION` with Cloud Build substitutions when required.
The service is private by default; configure Cloud Run IAM explicitly for the intended users or callers.

## iOS and JSBox

- Copy `clients/scriptable/BlockchainMonitWidget.js` into Scriptable, add a widget, and set its parameter to the deployed app base URL.
- Copy `clients/jsbox/blockchain-monit.js` into JSBox or import it as a `jsbox-wf` action. Pass `{ endpoint: "https://YOUR-APP/api/tokenlist" }` or change `DEFAULT_ENDPOINT`.

Both clients consume the same public, read-only token API.
