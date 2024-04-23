import { z } from "zod";

export const FormScheme = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        detail: z.string(),
        picDetailURL: z.array(z.string()),
        pdfURL: z.string(),
}))

export type Form = z.infer<typeof FormScheme>
