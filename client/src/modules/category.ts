import { z } from "zod";

export const FormType = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        detail: z.string(),
        picDetailURL: z.array(z.string()),
        pdfURL: z.string(),
    }));

export const CategoryScheme = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        forms: FormType
    })
);

export type Category = z.infer<typeof CategoryScheme>
