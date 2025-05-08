import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.optional(z.string().min(3)),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "Nova senha é obrigatória!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Senha é obrigatória!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "No mínimo 6 caracteres",
  }),
});

export const ResetRequestSchema = z.object({
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
});

export const ResetSchema = z.object({
  token: z.optional(z.any()),
  password: z.string().min(6, {
    message: "No mínimo 6 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "No mínimo 6 caracteres",
  }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não são iguais",
      path: ['confirmPassword']
    });
  }
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatório",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});