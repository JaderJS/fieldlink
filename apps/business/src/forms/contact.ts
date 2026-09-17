"use server"

import { z } from 'zod'


export async function sendContactForm(formData: FormData): Promise<void> {
    const sendContactSchema = z.object({
        name: z.string().min(3),
        property: z.string().min(3),
        phone: z.string(),
        text: z.string().min(3)
    })

    const data = {
        name: formData.get("name"),
        property: formData.get("property"),
        phone: formData.get("phone"),
        text: formData.get("text"),
    }

    const parsed = sendContactSchema.safeParse(data)
    if (parsed.error) {
        const errors = z.treeifyError(parsed.error)
        console.log(errors)
        return
    }

    console.log(parsed)

    return
}