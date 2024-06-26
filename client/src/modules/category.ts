import { z } from "zod";

export const FormType = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        totalViews: z.number(),
        detail: z.array(z.string()),
        picDetailURL: z.array(z.string()),
        pdfURL: z.string(),
    }));

export const CategoryScheme = z.array(
    z.object({
        id: z.number(),
        icon: z.string().nullable(),
        criterion: z.string().nullable(),
        name: z.string(),
        forms: FormType
    })
);

export const SingleCategoryScheme =
    z.object({
        id: z.number(),
        icon: z.string().nullable(),
        criterion: z.string().nullable(),
        name: z.string(),
        forms: FormType
    }
    );

export type Category = z.infer<typeof CategoryScheme>
export type SingleCategory = z.infer<typeof SingleCategoryScheme>
