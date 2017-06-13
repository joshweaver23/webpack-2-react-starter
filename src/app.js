import React from 'react';
import ReactDOM from 'react-dom';
import css from './app.scss';
const FontAwesome = require("font-awesome-sass-loader");

ReactDOM.render(
	<div>
		<h1>Hello, world!</h1>
		<i className="fa fa-free-code-camp fa-lg" aria-hidden="true"></i>
	</div>,
	document.getElementById('root')
);