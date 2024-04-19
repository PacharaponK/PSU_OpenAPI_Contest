
import { useAuth } from "react-oidc-context";

export default function Home() {
  const auth = useAuth();  

  return (
    <div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => auth.signinRedirect()}
      >
        Log in
      </button>
    </div>
  );
}
