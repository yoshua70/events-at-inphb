import { gql } from "@apollo/client";

export const CreateUser = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
    }
  }
`;
