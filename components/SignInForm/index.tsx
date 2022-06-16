import { yupResolver } from "@hookform/resolvers/yup";
import { ApiError } from "@supabase/supabase-js";
import Message from "components/Message";
import { signInInputSchema } from "helpers/sign-in-input.schema";
import { supabase } from "lib/supabase-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserSignInFormData } from "types/UserSignUpFormData";

const SignInForm = () => {
  const [authError, setAuthError] = useState<ApiError | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInFormData>({ resolver: yupResolver(signInInputSchema) });

  const signIn = handleSubmit(async (data) => {
    const { error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (error) setAuthError(error);
  });

  return (
    <div className="flex flex-col px-4 py-4 gap-4 items-center drop-shadow-md shadow-gray-800 bg-white rounded-md w-sm md:max-w-md">
      <h1>Rejoignez une grande famille.</h1>
      {authError && (
        <Message content={authError.message} bgColor="bg-red-700" />
      )}

      <form onSubmit={signIn} className="flex flex-col gap-4 w-full">
        <input {...register("email")} placeholder="Email instituionnel" />
        {errors.email && (
          <p className="text-red-400">{errors.email?.message}</p>
        )}
        <input
          {...register("password")}
          placeholder="Mot de passe"
          type="password"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password?.message}</p>
        )}
        <button type="submit" className="bg-blue-700 text-white">
          Connexion
        </button>
      </form>

      <Link href="/sign-up">
        <a className="underline text-blue-400">
          Pas encore de compte ? Créez-en un dès maintenant !
        </a>
      </Link>
    </div>
  );
};

export default SignInForm;
