import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpsertOrderSchema } from "@/features/order/schema/upsert.schema"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { UpsertCartSchema } from "../../schema/schema.cart"
import { useDeleteCart } from "../../hooks/use.delete.cart"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Label } from "@/components/ui/label"

interface FormConfigProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
}

export const FormConfig = ({ form, onAutoSave }: FormConfigProps<UpsertCartSchema>) => {

    const { mutateAsync: deleteCartFn } = useDeleteCart()

    return (
        <div className="space-y-2">
            <FormField
                name={`title`}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormDescription>Informe o nome para identificar a compra mais facilmente</FormDescription>
                        <FormControl>
                            <Input
                                {...field}
                                onBlur={() => {
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="bg-red-500/50 p-12 flex justify-between items-center rounded-xl">
                <div className="flex flex-col">
                    <Label>Excluir compra?</Label>
                    <span className="text-xs">Atenção essa ação é irreversível</span>
                </div>
                <Button variant={"destructive"} onClick={() => deleteCartFn(form.getValues('id') as number)}>
                    <Trash />
                </Button>
            </div>
        </div>
    )
}