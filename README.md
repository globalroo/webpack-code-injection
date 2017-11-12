# webpack-code-injection [![Build Status](https://travis-ci.org/globalroo/webpack-code-injection.svg?branch=master)](https://travis-ci.org/globalroo/webpack-code-injection)[![Dependency Status](https://dependencyci.com/github/globalroo/webpack-code-injection/badge)](https://dependencyci.com/github/globalroo/webpack-code-injection)[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Webpack code injection

```sh
npm install yarn -g
yarn
yarn run dev to serve the project at localhost:8080 or
yarn build
```
## Brief description

A build time process using a custom webpack-loader to inject code into a vanilla application at specific locations
that 'make sense' for integrations with third party vendors or customisers.

* This PoC has a single module containing some test components with comment hooks (preludes), contained in `app.js`.
* At build time, the prelude comments held in `app.js` will either be removed or replaced with plugin / custom code.
* The custom code that gets injected depends upon the availability of a filename matching the prelude name. For example, __//prelude::appMounted::__ would seek a file named `appMounted.js` to inject at that location.
* The location of the file to match is determined by the `configuration.js` file in the root of the tree. This currently allows switching between `companya` and `companyb` to demonstrate the different integrations.
* The integrations themselves are located in the `src/plugins` directory.

__Motivation__: The vanilla application code can change as much as it likes through multiple versions and the third party vendors or customisers can take the latest code and build with their integrations without worrying about implementation changes / refactoring; provided the hooks remain in the correct locations.

Hooks/Preludes can be placed anywhere and follow the pattern:

```js
//prelude::fileNameToInject::
```

### Example:

Vanilla Application code
`app.js`:
```javascript
componentDidMount() {
	// Application specific code
	ExampleService.doThings();
	//prelude::appMounted::
}
```

Plugin / custom code (perhaps initialise some third party service, like Firebase)
`src/plugins/companya/appMounted.js`:
```javascript
  // Initialize Firebase
  const config = {
    apiKey: MY_API_KEY,
    authDomain: "fun-food-friends-eeec7.firebaseapp.com",
    databaseURL: "https://fun-food-friends-eeec7.firebaseio.com",
    projectId: "fun-food-friends-eeec7",
    storageBucket: "fun-food-friends-eeec7.appspot.com",
    messagingSenderId: "144750278413"
  };
  firebase.initializeApp(config);
```

After build process, the prelude is replaced.
`build/app.bundle.js`:
```javascript
componentDidMount() {
	// Application specific code
	ExampleService.doThings();
	// Initialize Firebase
	const config = {
		apiKey: MY_API_KEY,
		authDomain: "fun-food-friends-eeec7.firebaseapp.com",
		databaseURL: "https://fun-food-friends-eeec7.firebaseio.com",
		projectId: "fun-food-friends-eeec7",
		storageBucket: "fun-food-friends-eeec7.appspot.com",
		messagingSenderId: "144750278413"
	};
	firebase.initializeApp(config);
}
```

### Webpack loader options

```js
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

The loader can be found in `custom-loader`. Checkout the `webpack.config.js` file for example usage.
