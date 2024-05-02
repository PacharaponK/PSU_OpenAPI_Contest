import { z } from "zod";

export const FormWithCategoryScheme = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        totalView: z.number(),
        detail: z.array(z.string()),
        updateDate: z.string(),
        picDetailURL: z.array(z.string()),
        pdfURL: z.string(),
        category: z.object({
            id: z.number(),
            name: z.string(),
            criterion: z.string(),
        })
}))

export type FormWithCategory = z.infer<typeof FormWithCategoryScheme>
