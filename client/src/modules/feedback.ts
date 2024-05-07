import { z } from "zod";
import { SingleFormScheme } from "./singleForm";

export const FeedbacksScheme = z.array(
    z.object({
        id: z.number(),
        text: z.string(),
        user: z.object({
            id: z.number(),
            studentId: z.string(),
            dorm: z.string(),
            dormDetail: z.string(),
            address: z.string(),
            satisfies: z.boolean(),
        }),
        form: SingleFormScheme
    })
)

export type Feedbacks = z.infer<typeof FeedbacksScheme>