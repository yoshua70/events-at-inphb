import Layout from "components/Layout";
import SignInForm from "components/SignInForm";
import { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <Layout title="Inscription">
      <div className="flex flex-col px-4 py-4">
        <SignInForm />
      </div>
    </Layout>
  );
};

export default SignUp;
