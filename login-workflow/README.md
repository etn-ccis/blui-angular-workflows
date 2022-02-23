# Angular Auth Workflow 
![npm (scoped)](https://img.shields.io/npm/v/@brightlayer-ui/angular-auth-workflow)

The Angular Auth Workflow package provides a consistent authentication and registration experience across Eaton web applications using Angular. 

This includes pre-built implementations of the screens for Login, Forgot Password, Self-Registration, Contact Support, Registration By Invitation, and a dialog for Change Password.

This documentation explains the steps required to integrate this auth workflow into your application.

![Login](https://raw.githubusercontent.com/brightlayer-ui/angular-workflows/master/login-workflow/media/login.png) ![Home](https://raw.githubusercontent.com/brightlayer-ui/angular-workflows/master/login-workflow/media/home.png) ![Password](https://raw.githubusercontent.com/brightlayer-ui/angular-workflows/master/login-workflow/media/password.png)

# Installation
To install the latest version of this package, run:
```shell
npm install @brightlayer-ui/angular-auth-workflow
// or
yarn add @brightlayer-ui/angular-auth-workflow
```

# Integration
You have two options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project provided in the package. 

To integrate the package into an existing project, read our [Existing Project Integration](https://github.com/brightlayer-ui/angular-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration](https://github.com/brightlayer-ui/angular-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.

# Services 

In order to provide your own custom API calls, access auth-state, or configure general auth module settings, check out our [services documentation](https://github.com/brightlayer-ui/angular-workflows/tree/master/login-workflow/docs/services.md).

# Page Customization

To replace the default content that is rendered on the screen, check out our [page customization documentation](https://github.com/brightlayer-ui/angular-workflows/tree/master/login-workflow/docs/page-customization.md). 

# Error Handling

If your application requires custom error-handling, check out our [error-handling documentation](https://github.com/brightlayer-ui/angular-workflows/tree/master/login-workflow/docs/error-handling.md). 

# Contributors

To work on this package as a contributor, first clone down the repository:
```shell
git clone https://github.com/brightlayer-ui/angular-workflows
cd angular-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:
```shell
yarn start:example
```

If you make changes to the library components and want to link them to the running example project, you can run:
```shell
yarn watch
```

In a new terminal, run: 
```shell
cd example && yarn start:lib
```
## Browser Support

Brightlayer UI Login Workflow will work with any modern browser. For details refer to our [Browser Support](https://brightlayer-ui.github.io/development/frameworks-web/angular#browser-support) documentation.
