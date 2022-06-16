import Layout from "components/Layout";
import ProfileForm from "components/ProfileForm";
import { supabase } from "lib/supabase-client";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };
  return (
    <Layout>
      <div className="flex flex-col px-4 py-4 gap-4">
        <ProfileForm />
        <button onClick={signOut} className="bg-red-700 text-white">
          Déconnexion
        </button>
      </div>
    </Layout>
  );
};

export default Profile;
