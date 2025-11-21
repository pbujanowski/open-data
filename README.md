# open-data

A modern monorepo for the Open Data platform, containing multiple React clients, NestJS backend services, and a shared UI library. Managed with Yarn workspaces for easy development and deployment.

## Structure

- `apps/clients/` — Frontend React applications (main, dashboard, national-bank)
- `apps/services/` — Backend NestJS services (dashboard, national-bank)
- `libs/shared-ui/` — Shared React UI components and utilities

## Getting Started

1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Build all packages:**
   ```sh
   yarn build
   ```
3. **Start development servers:**
   ```sh
   yarn workspaces run dev
   # or for all 'start:dev' scripts
   yarn workspaces run start:dev
   ```

## Linting

To lint the entire repository or any package, run ESLint from the root directory:

```
yarn eslint "apps/**/*/src"
yarn eslint "libs/**/*/src"
```

You can also lint a specific package:

```
yarn eslint apps/clients/dashboard/src
```

All packages use the root ESLint configuration (`eslint.config.mjs`). There are no local ESLint configs in subpackages.

## Formatting

To format code using Prettier, run:

```
yarn prettier --write .
```

All packages use the root Prettier configuration (`.prettierrc`).

## Testing

To run all tests in all packages:

```
yarn test
```

To run tests in a specific package:

```
yarn workspace <package-name> test
```

To check code coverage (if supported by the package):

```
yarn workspaces foreach -pt run test:cov
```

## Build

To build all packages in the correct order:

```
yarn build
```

To build a specific package:

```
yarn workspace <package-name> build
```

## Environment Variables

Each app/service has its own `.env.development` file. See the respective package README for required variables.

## Continuous Integration

A GitHub Actions workflow runs lint, test, and build on every push and pull request to `main`.

## Contributing

1. Fork and clone the repository
2. Create a new branch for your feature or fix
3. Make your changes and add tests
4. Run lint, test, and build before pushing
5. Open a pull request

---

For more details, see the README in each package.
