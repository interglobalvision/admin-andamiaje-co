# admin.andamiaje.co

This project contains the source code of the Admin panel for Andamiaje.co

## Setup
```
git clone git@github.com:interglobalvision/admin-andamiaje-co.git
cd admin-andamiaje-co
yarn
```

### Scripts

#### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<img src='https://camo.githubusercontent.com/41678b3254cf583d3186c365528553c7ada53c6e/687474703a2f2f692e696d6775722e636f6d2f466e4c566677362e706e67' width='600' alt='Build errors'>

#### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

#### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also [includes a service worker](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

This would use the variables in `.env.production` for the build.

Your app is ready to be deployed.

## Deploy
- `npm install -g firebase-tools`
- `firebase use [alias]`. Alias available are `default` used for dev and `production`.
- `yarn buildDeploy`
