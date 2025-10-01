# YON админка

## Quick start for the development

First install dependencies:

```sh
npm install
```

To run in the development mode with hot module reloading:

```sh
npm start
```

That command opens http://localhost:4004 page in your browser.


## Building the production version

```sh
npm run build
```
See "dist" folder for results.

To run the production build:

```sh
npm run preview
```

## Build modes or building for different servers

This frontend application can be built for staging or production server.

To build for the staging run:
```sh
npm run build -- --mode staging
```

To build for the production:
```sh
npm run build -- --mode production
```
or simply:
```sh
npm run build
```

On different servers the app can use different settings (different API URLs, for example).  
Use the following env files at the repository's root to specify those settings:
* for staging - `.env.staging`
* for production - `.env.production`
* for local development - `.env.development`


## Linting and type checking

Run linting:

```sh
npm run lint
```

Run type checking:

```sh
npm run ts
```

## Storybook

```sh
npm run storybook
```

## Testing

```sh
npm test
```
