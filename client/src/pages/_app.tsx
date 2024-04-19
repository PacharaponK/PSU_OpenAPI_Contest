import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  onSigninCallback: (user: any) => {
    window.location.href = '/home'
  },
  authority: 'http://psusso-test.psu.ac.th/application/o/psuapi-contest-nextapi',
  client_id:
    'j6eSrMS08CLwLUprhFAlg6FB8o0JUF8mtuHapoDk',
  scope: 'openid email profile offline_access',
  response_ype: 'code',
  silent_renew: true,
  use_refresh_token: true,
  redirect_uri: 'http://localhost:3000/home',
};

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider {...oidcConfig}>
    <Component {...pageProps} />
  </AuthProvider>
}
