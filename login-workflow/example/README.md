## Example Auth Workflow App

This project demonstrates how to use the [@brightlayer-ui/angular-auth-workflow](https://www.npmjs.com/package/@brightlayer-ui/angular-auth-workflow). It includes a sample Home screen with buttons to log out and change password. If the user is not authenticated, he/she will be presented with the authentication workflow with screens for Log In, Forgot Password, Support, and Registration.

This project also demonstrates how to provide mock API service implementations for `BluiAuthUIService` and `BluiRegisterUIService`.  These service calls should be replaced with API calls instead of resolving with mocked responses. 

Whenever a user is logged in, this app stores session information in local storage.  The 'Remember Me' toggle state is also stored in local storage, so that user credentials can be pre-populated when a user logs out.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.<br />
