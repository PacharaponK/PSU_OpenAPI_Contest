import { useAuth } from "react-oidc-context";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home() {
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>FormHub</title>
			</Head>
			<div className="landing-background-image">
				<Hero signIn={auth.signinRedirect} />
				<Feature />
				<div>
					<Footer />
				</div>
			</div>
		</>
	);
}
