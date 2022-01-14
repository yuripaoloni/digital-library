# Digital Library frontend

The Digital Library frontend was built with:

- [React](https://it.reactjs.org/)
- [MUI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## Getting started

To get a local copy up and running follow the steps below.

### Prerequisites

1. Download and install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Download and install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

### Installation

1. Clone the repository: `git clone https://github.com/FabrizioFornari/SPM2021-YMLA.git`

2. Move in the frontend folder and install the required dependencies: `yarn install`

### Run & Build

- To launch the web application in development mode: `yarn start`
- To build the web application: `yarn build`

Before running or building the project, rembember to add the [server](../backend/README.md) URL in the configuration files:

- `.env.development`: used with `yarn start`
- `.env.production`: used with `yarn build`

The server URL is specified inside the configuration files with the following format:

```bash
REACT_APP_API_URL=http://localhost:<SERVER_PORT>
```

### Testing

The tests was written using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to test React components and [MSW](https://mswjs.io/) to mock APIs.

- To execute the tests: `yarn test`
- To get the tests coverage: `yarn test:coverage`
