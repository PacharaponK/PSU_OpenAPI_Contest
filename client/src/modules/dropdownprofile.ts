import { z } from "zod";

export const LocationOptionScheme = z.object({
  id: z.number(),
  label: z.string(),
});
export type LocationOption = z.infer<typeof LocationOptionScheme>;
