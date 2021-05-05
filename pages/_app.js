// import App from 'next/app'

import "../styles/globals.css";

import Nav from "../components/nav";

import React, { useState, useCallback } from "react";

function MyApp({ Component, pageProps }) {
	const theme_map = {
		dark: 'light',
		light: 'solar',
		solar: 'dark'
	};

	let [currentTheme, useTheme] = useState((Object.keys(theme_map)[0])) ;

	// FIXME: fix infinite loop problem
	const toggle_theme = useCallback(() => {
		useTheme(theme_map[currentTheme]);
		console.log("working??");
	});

	return (
		<div className={currentTheme}>
			{/* pass a lambda callback here? */}
			<Nav theme={currentTheme} />
			<main>
				<Component {...pageProps} />
			</main>
		</div>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;