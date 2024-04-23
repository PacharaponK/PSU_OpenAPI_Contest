import { z } from "zod";

export const SingleFormScheme = z.object({
    id: z.number(),
    name: z.string(),
    detail: z.string(),
    picDetailURL: z.array(z.string()),
    pdfURL: z.string(),
})

export type SingleForm = z.infer<typeof SingleFormScheme>
