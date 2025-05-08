import * as z from "zod";

export const ClientGroupSchema = z.object({
  id: z.string({
    required_error: "Projeto é obrigatório",
  }),
  client: z.string({
    required_error: "Cliente é obrigatório",
  }),
  project_group: z.string({
    required_error: "Grupo é obrigatório",
  }),
  callbackURL: z.boolean(),
});