# Change Log

## v4.0.1 (Unreleased)

### Fixed

-   Fixed Email input should have a consistant invalid email error message in the login page ([#99](https://github.com/etn-ccis/blui-angular-workflows/issues/99)).

## v4.0.0 (November 22, 2022)

### Changed

-   Updated to Angular 14 for building the library.

### Fixed

-   Fixed duplicate IDs on the Change Password Page ([#178](https://github.com/etn-ccis/blui-angular-workflows/issues/178)).
-   Fixed some minor Chinese translations issue ([#150](https://github.com/etn-ccis/blui-angular-workflows/pull/150)).

## v3.0.1 (June 13, 2022)

### Fixed

-   Fixed bug in create-account workflow where `requestRegistrationCode` was not invoked before reaching the "Verify Email" screen ([#132](https://github.com/etn-ccis/blui-angular-workflows/issues/132)).

## v3.0.0 (March 15, 2022)

### Changed

-   Updated to Angular 13 for building the library.

## v2.4.0 (November 16, 2021)

### Changed

-   Changed package namespace from `@pxblue` to `@brightlayer-ui`.

## Package Migration Notice

Previous versions listed after this indicator refer to our deprecated `@pxblue` packages.

---

## v2.4.0 (September 28, 2021)

### Added 

- Added new `LoginErrorDialogData` property that allows for custom form, dialog, or message-box errors on the Login screen.

## v2.3.0 (September 15, 2021)

### Added

-   Added new properties `customFirstNameRequirements` and `customLastNameRequirements` to the `PxbAuthConfig` that allows for custom max length restrictions.

### Changed

-   Changed account registration page order; EULA page now occurs first.
-   Changed default translation strings to closely match against those found in [@pxblue/react-auth-workflow](npmjs.com/package/@pxblue/react-auth-workflow).

## v2.2.0 (May 27, 2021)

### Added

-   Added translations for simplified Chinese, French, and Spanish.

### Changed

-   Updated styles to improve mobile responsiveness.


## v2.1.0 (April 30, 2021)

### Added

-   Added additional `pageTitle` and `pageInstructions` props onto `AccountDetails` for more customization during account registration.
-   Added `registrationSuccessScreen` prop to `<blui-create-account>` & `<blui-create-account-invite>` component for success screen customization.
-   Added `authGuardRedirectRoute` prop to `PxbAuthConfig`.

### Changed

-   Changed `validateUserRegistrationRequest` method signature to handle pre-existing accounts.

## v2.0.0 (March 31, 2021)

### Added

-   Added ability to suppress optional pages (Contact Support, Create Account, etc) via `PxbAuthConfig`.
-   Added `customEmailValidator` prop to `PxbAuthConfig`.
-   Added `inferOnAuthenticatedRoute` to `PxbAuthSecurityService`.
-   Added text and content overrides via `PxbAuthTranslations`.

### Changed

-   Changed how custom account details can be provided during account registration.
-   Changed how custom password requirements are configured in `PxbAuthConfig`.

### Removed

-   Removed ability to skip first & last name during account registration.

## v1.0.1 (December 31, 2020)

### Fixed

-   Fixed ChangeDetection-related warning when navigating.

## v1.0.0 (December 30, 2020)

Initial release
