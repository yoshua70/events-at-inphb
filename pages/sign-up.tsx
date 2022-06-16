import Layout from "components/Layout";
import SignUpForm from "components/SignUpForm";
import { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <Layout title="Inscription">
      <div className="flex flex-col px-4 py-4">
        <SignUpForm />
      </div>
    </Layout>
  );
};

export default SignUp;
