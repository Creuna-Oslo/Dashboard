# Dashboard

## Install dependencies

```
yarn
```

## Scripts

Available scripts are defined in `package.json`. The most important ones are:

- **dev**: Start development environment
- **build**: Build for production

Example:

```
yarn dev
```

## Build

The `build` script outputs files to `./dist`. Important files to know about:

- `client.js`: This is where all of your authored code ends up.
- `vendor.js`: All of your `npm`-dependencies.
- `style.css`: Compiled Sass

Both `client.js` and `vendor.js` should be served to the client. Because we do chunk hashing, these can be cached indefinitely.

## Generated files

- `./source/static-site/pages/pages.js`: Exports all of the components in `source/static-site/pages`. It is used to build the static site.

## Development

### React components

Put React components in `source/components`. It is recommended to have each component in a separate folder, containing a `jsx` file, a `scss` file and an `index.js` file.

### Aliases

By default, two aliases are included in `webpack.config`:

- `components` which resolves to `source/components`
- `js` which resolves to `source/js`

These aliases allow you to import like this from any `js`/`jsx` file:

```
import SomeComponent from 'components/some-component';
import someScript from 'js/some-script';
```

These aliases are also included in `jsconfig.json` which makes VS Code resolve the aliases, giving you autocomplete.

### Static Site

All static site pages (`source/static-site/pages`) that have a folder and a component named the same, as well as an `index.js` file, will have their routes added to the router. You can customize the name and path of the page in the page's `jsx` file by adding frontmatter to the first line like this:

```js
/*
name: Custom page name
path: /custom-path
*/
```

All properties are optional.

### Styles

The main entry point for styles is `source/scss/styles.scss`. This file imports any and all `.scss` files in `source/components`. After adding new `.scss` files you need to run `yarn dev` again in order for them to be discovered.

## Code formatting

`./.eslintrc.json` includes config for using [prettier](https://prettier.io) to format your source code. In addition to making your code look pretty, this helps to enforce a consistent coding style within your project. There are plugins for Prettier to most of the major editors (like [VS code](https://code.visualstudio.com) or [Sublime](https://www.sublimetext.com)). You should install the Prettier-pugin for your editor. It is very nice.

## UI Testing

[TestCafé](https://devexpress.github.io/testcafe/) is included for easy end to end testing. There is an example test provided in `/tests/example-page.js`.

### Things to note

- run tests with `yarn test:ui` or `npm run test:ui`
  - The development server must already be running for this to work (`yarn dev` or `npm run dev`)
- TestCafé will find and run all tests in located directly in `./ui-tests`
