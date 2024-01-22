import * as z from "zod";
import { userAuthRigsterSchema, userAuthLoginSchema } from "./validation";

export type LogInFormData = z.infer<typeof userAuthLoginSchema>;
export type RegisterFormData = z.infer<typeof userAuthRigsterSchema>;
