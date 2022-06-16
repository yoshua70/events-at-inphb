import * as yup from "yup";

export const profileInputSchema = yup
  .object({
    name: yup
      .string()
      .required("Veuillez saisir votre nom.")
      .min(8, "Le nom doit être au moins de 8 caractères.")
      .max(255, "Le nom doit être au plus de 255 caractères."),
    username: yup
      .string()
      .min(3, "Le nom d'utilisateur doit être au moins de 3 caractères.")
      .max(25, "Le nom d'utilisateur doit être au plus de 255 caractères.")
      .nullable(),
    bio: yup.string().max(255),
  })
  .required();
