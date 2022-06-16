import { signUpInputSchema } from "helpers/sign-up-input-schema";
import { useForm } from "react-hook-form";
import { UserSignUpFormData } from "types/UserAuthFormData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { supabase } from "lib/supabase-client";
import { useMutation } from "@apollo/client";
import { CreateUser } from "graphql/mutations/CreateUser";
import Message from "components/Message";
import { ApiError } from "@supabase/supabase-js";
import Link from "next/link";

const SignUpForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [authError, setAuthError] = useState<ApiError | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpFormData>({ resolver: yupResolver(signUpInputSchema) });

  const [createUser, { data, loading, error }] = useMutation(CreateUser);

  const signUp = handleSubmit(async (data) => {
    const { error, user } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (!error) {
      createUser({
        variables: {
          data: {
            email: data.email,
            supabaseUserId: user?.id,
          },
        },
      });
      setSubmitted(true);
    }
    setAuthError(error);
  });

  if (loading) return <Message content="On vérifie le kpla..." />;
  if (error) return <Message content="Le kpla n'est pas bon..." />;

  return (
    <div className="flex flex-col px-4 py-4 gap-4 items-center drop-shadow-md shadow-gray-800 bg-white rounded-md w-sm md:max-w-md">
      <h1>Rejoignez une grande famille.</h1>
      {submitted && (
        <Message content="Consulter votre courriel pour finaliser votre inscription." />
      )}
      {authError && (
        <Message content={authError.message} bgColor="bg-red-700" />
      )}
      <form onSubmit={signUp} className="flex flex-col gap-4 w-full">
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
        <input
          {...register("password_confirmation")}
          placeholder="Confirmez votre mot de passe"
          type="password"
        />
        {errors.password_confirmation && (
          <p className="text-red-400">
            {errors.password_confirmation?.message}
          </p>
        )}
        <button type="submit" className="bg-blue-700 text-white">
          Inscription
        </button>
      </form>
      <Link href="/sign-in">
        <a className="underline text-blue-400">
          Déjà un compte ? Connectez-vous ici.
        </a>
      </Link>
    </div>
  );
};

export default SignUpForm;
