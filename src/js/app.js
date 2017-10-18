import React, { Component } from "react";
import { render } from "react-dom";
import "src/css/style.css";
import logo from "src/assets/logo.svg";

//prelude::appHeading::

const ExampleService = {
	doThings: () => {
		// eslint-disable-next-line
		console.log("I'm in the vanilla web app workflow");
	},
	otherThings: str => {
		// eslint-disable-next-line
		console.log(str);
	}
};

//prelude::appModule::

export default class App extends Component {
	constructor(props) {
		super(props);

		//prelude::appCreate::
	}
	componentDidMount() {
		// Application specific code
		ExampleService.doThings();

		//prelude::appMounted::
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p className="App-intro">Code injection via webpack</p>
					<span>
						<small>
							Use comments as preludes to inject code into your code. See console or&nbsp;
							<a href="http://www.github.com/globalroo/webpack-code-injection">README</a>.
						</small>
					</span>
				</header>
				<div />
			</div>
		);
	}
}

render(<App />, document.getElementById("root"));
