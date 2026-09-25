# Workshop Shop

A small, editable ecommerce application for workshops. It has a browser frontend, shop API, PostgreSQL database, PostgREST data gateway, and separate mock payment service. The application source is mounted into prebuilt Node containers, so there are no application image builds.

## Run locally

To start the app:

```bash
make up
```

To stop the app:

```bash
make down
```

### OTel

Use the Bluebox template as the starting point:

```bash
cp .env.otel.bluebox-template .env.otel
# then fill in the Bluebox endpoint and Authorization header in .env.otel

# Start the app (pulls images, waits for readiness)
make up
```

The repo keeps the local `.env.otel` and `.bluebox/` state out of git so the ingest credentials stay outside the repository.
