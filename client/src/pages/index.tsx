import { useAuth } from "react-oidc-context";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Image from "next/image";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => auth.signinRedirect()}
        >
          Log in
        </button>
      </div>
      <Hero />
      <Feature />
      <div>
        <Footer />
      </div>
    </div>
  );
}
