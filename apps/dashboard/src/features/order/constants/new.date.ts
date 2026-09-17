import { z } from "zod"
import { dateSchema } from "../schema/upsert.schema"
import { add, addDays, differenceInHours } from "date-fns"

type DateSchema = z.infer<typeof dateSchema>

export const DEFAULT_NEW_DATE_IN_ORDER: DateSchema = {
    start: new Date(),
    finish: addDays(new Date(), 1),
    hours: differenceInHours(addDays(new Date(), 1), new Date())
}