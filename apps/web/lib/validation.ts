import * as z from "zod";

export const userAuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, "Password must be 5 characters long"),
});

export const userAuthRigsterSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(5, "Password must be 5 characters long"),
  confirm_password: z.string(),
});
