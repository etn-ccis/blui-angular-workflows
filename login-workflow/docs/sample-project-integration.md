# Starting from the Example Project

If you don't have an existing Angular project and would like an example as a starting point, consider using the provided example project in the `/example` folder.

#### Setup

Clone or download the package [repository](https://github.com/etn-ccis/blui-angular-workflows) and then copy the `/login-workflow/example` folder to a new location. Navigate into this folder and run `yarn` to install the required dependencies.

> If you are using npm as your package manager, you can delete the yarn.lock file and run `npm install` instead. This will generate a new lock file.


#### Rename the Project

You will probably want to call your project something other than 'example'. Rename the folder to whatever you'd like your project name to be. You will also need to update the relevant project-related configuration options in the `package.json`, `angular.json`, and `index.html` files.


#### Configure BluiAuthConfig

Open the `AuthComponent` component file (`app/pages/auth/auth.component.ts`) and adjust the configuration options of the `BluiAuthConfig` as necessary for your project (refer to the [Readme](https://github.com/etn-ccis/blui-angular-workflows/tree/master/login-workflow/README.md)). As a suggestion, you may want to swap out the example image with a product logo for your project.


#### Implement BluiAuthUIService and BluiRegisterUIService

In the example project, all network calls are mocked with `setTimeouts`. The EULA is also a static sample file.

Provide real implementation details within the `example/src/services/auth-ui.service.ts` and `examples/src/services/register-ui/service.ts` files, which are currently mocking network behavior. Most likely, your implementation will involve making calls to an API and using session storage or cookies to retain information as needed by your application (such as the user's name and email).

#### Routing
Any new routes will have to be added to the `app.routing.ts` file.
