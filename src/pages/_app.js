import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Header from "components/Header";
// import 'styles/index.css'

import { AddressProvider } from "context/AddressContext";
// import Link from 'next/link'

import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const MyApp = ({ Component, pageProps }) => {
	return (
		<AddressProvider>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Header />
				<Component {...pageProps} />
			</ThemeProvider>
		</AddressProvider>
	);
};

export default MyApp;
