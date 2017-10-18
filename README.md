# webpack-code-injection [![Build Status](https://travis-ci.org/globalroo/webpack-code-injection.svg?branch=master)](https://travis-ci.org/globalroo/webpack-code-injection)[![codecov](https://codecov.io/gh/globalroo/webpack-code-injection/branch/master/graph/badge.svg)](https://codecov.io/gh/globalroo/webpack-code-injection)[![Dependency Status](https://dependencyci.com/github/globalroo/webpack-code-injection/badge)](https://dependencyci.com/github/globalroo/webpack-code-injection)[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Webpack code injection

```sh
npm install yarn -g
yarn
yarn run dev or
yarn build
```
## Brief description

A build time process using a custom webpack-loader to inject code into a vanilla application at specific locations
that 'make sense' for integrations with third party vendors or customisers.

Motivation: The vanilla application code can change as much as it likes through multiple versions and the
third party vendors or customisers can take the latest code and build with their integrations without worrying
about implementation changes / refactoring; provided the hooks remain in the correct locations.

Preludes can be placed anywhere and follow the pattern:

```js
//prelude::fileNameToInject::
```

```json
{
	loader: "prelude-loader",
	options: {
		integrateWith: <PluginDir>,
		pluginDirectory: <PluginsRoot>
	}
}
```

The comments will be replaced with code, or removed at build time.

The built project will contain the composite code from the plugin / customised code and vanilla application.
