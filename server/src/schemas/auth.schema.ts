import z from "zod";

export const authSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(6)
})
