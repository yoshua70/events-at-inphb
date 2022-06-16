import { gql } from "@apollo/client";

export const FetchUserProfileBySupabaseId = gql`
  query Query($where: UserWhereUniqueInput!) {
    user(where: $where) {
      profile {
        name
        username
        bio
      }
    }
  }
`;
