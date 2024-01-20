import * as z from "zod";
import { userAuthSchema } from "./validation";

export type FormData = z.infer<typeof userAuthSchema>;
