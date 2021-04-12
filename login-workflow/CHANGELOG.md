# Change Log

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

## v1.0.0 (December 20, 2021)

Initial release
