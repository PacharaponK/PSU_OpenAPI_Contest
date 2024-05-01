import { z } from "zod";

export const SingleFormScheme = z.object({
    id: z.number(),
    name: z.string(),
    detail: z.array(z.string()),
    picDetailURL: z.array(z.string()),
    updateDate: z.string(),
    pdfURL: z.string(),
    category: z.object({
        id: z.number(),
        name: z.string(),
        criterion: z.string(),
    })
})

export type SingleForm = z.infer<typeof SingleFormScheme>
