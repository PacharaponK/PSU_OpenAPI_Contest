import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "react-oidc-context";
import conf from "@/conf/main";
import { Route } from "@/modules/routes";
import { StudentProvider } from "../contexts/StudentContext";
import { ContextProvider } from "@/contexts/Auth.context";

const oidcConfig = {
	onSigninCallback: (user: any) => {
		window.location.href = `${Route.form.formFirstLogin}`;
	},
	authority:
		"http://psusso-test.psu.ac.th/application/o/psuapi-contest-nextapi",
	client_id: "j6eSrMS08CLwLUprhFAlg6FB8o0JUF8mtuHapoDk",
	scope: "openid email profile offline_access",
	response_ype: "code",
	silent_renew: true,
	use_refresh_token: true,
	redirect_uri: `${conf.clientPreflix}${Route.form.formList}`,
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider {...oidcConfig}>
			<ContextProvider>
				<StudentProvider>
					<Component {...pageProps} />
				</StudentProvider>
			</ContextProvider>
		</AuthProvider>
	);
}
