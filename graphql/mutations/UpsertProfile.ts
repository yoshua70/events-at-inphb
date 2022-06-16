import { gql } from "@apollo/client";

export const UpsertProfile = gql`
  mutation Mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      profile {
        name
        username
        bio
      }
    }
  }
`;
