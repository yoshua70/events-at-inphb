import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileFormData } from "types/UserProfileFormData";
import { useForm } from "react-hook-form";
import { profileInputSchema } from "helpers/profile-input-schema";
import { useMutation, useQuery } from "@apollo/client";
import { UpsertProfile } from "graphql/mutations/UpsertProfile";
import { supabase } from "lib/supabase-client";
import Message from "components/Message";
import { FetchUserProfileBySupabaseId } from "graphql/queries/FetchUserProfileBySupabaseId";
import { GetServerSideProps } from "next";

// type Data = {
//   user: {
//     profile: {
//       name: string;
//       username: string;
//       bio: string;
//     };
//   };
// };

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: yupResolver(profileInputSchema),
  });

  const {
    loading: loadingQuery,
    error: errorQuery,
    data: dataQuery,
  } = useQuery(FetchUserProfileBySupabaseId, {
    variables: {
      where: {
        supabaseUserId: supabase.auth.user()?.id,
      },
    },
  });

  const [upsertProfile, { data, loading, error }] = useMutation(UpsertProfile);

  const setProfile = handleSubmit(async (data) => {
    console.log(data);
    const user = await supabase.auth.user();
    upsertProfile({
      variables: {
        data: {
          profile: {
            upsert: {
              update: {
                name: {
                  set: data.name,
                },
                username: {
                  set: data.username,
                },
                bio: {
                  set: data.bio,
                },
              },
              create: {
                name: data.name,
                username: data.username,
                bio: data.bio,
              },
            },
          },
        },
        where: {
          supabaseUserId: user?.id,
        },
      },
    });
  });

  if (loadingQuery) return <Message content="On vérifie le kpla..." />;
  if (loading) return <Message content="On vérifie le kpla..." />;
  if (error) {
    console.log(error);
    return <Message content={error.message} bgColor="red" />;
  }

  return (
    <div className="flex flex-col px-4 py-4 gap-4 items-center drop-shadow-md shadow-gray-800 bg-white rounded-md w-full md:max-w-md">
      <h1>Profile</h1>
      <form onSubmit={setProfile} className="flex flex-col gap-4 w-full">
        <input
          {...register("name")}
          placeholder="Nom"
          defaultValue={dataQuery?.user.profile.name}
        />
        {errors.name && <p>{errors.name?.message}</p>}
        <input
          {...register("username")}
          placeholder="Nom d'utilisateur"
          defaultValue={dataQuery?.user.profile.username}
        />
        {errors.username && <p>{errors.username?.message}</p>}
        <textarea
          {...register("bio")}
          placeholder="Bio"
          defaultValue={dataQuery?.user.profile.bio}
        />
        {errors.bio && <p>{errors.bio?.message}</p>}

        <button
          type="submit"
          onClick={setProfile}
          className="bg-blue-700 text-white"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { loading, error, data } = useQuery(FetchUserProfileBySupabaseId, {
//     variables: {
//       where: {
//         supabaseUserId: null,
//       },
//     },
//   });

//   return {
//     props: { user: data.user },
//   };
// };
