# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/nikolakozaryan/nodejs2022Q4-service.git
```

## Move to app folder

```
cd nodejs2022Q4-service
```

## Change brunch to develop

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## API

API description is available [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md#assignment-rest-service).
