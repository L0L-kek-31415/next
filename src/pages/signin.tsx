import { Inter } from "@next/font/google";
import AuthForm from "../components/authForm";

const inter = Inter({ subsets: ["latin"] });

interface Props {}

const LogIn: React.FC<Props> = () => {
  return (
    <AuthForm
      children="SignIn"
      href="/signup"
      link="Don't have an account? Sign Up"
      reqLink="http://localhost:3000/auth/login"
    />
  );
};

export default LogIn;
