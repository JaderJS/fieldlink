import { Node, useReactFlow } from "@xyflow/react"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BuilderProps {
    nodes: Node[]
    setNodes: Dispatch<SetStateAction<Node[]>>
    selectNode: Node | undefined
    onChange?: () => void
}

interface DataProps {
    rx: number
    tx: number
    type: any
    [key: string]: any
}

const builderSchema = z.object({
    rx: z.coerce.number(),
    tx: z.coerce.number(),
    type: z.union([
        z.object({
            analog: z.object({
                type: z.enum(['CSQ', 'DPL', 'TPL']),
                encoder: z.coerce.number().min(0).optional(),
                decoder: z.coerce.number().min(0).optional()
            }),
        }),
        z.object({
            digital: z.object({
                colorCode: z.coerce.number().min(0).max(15),
                slot: z.coerce.number().min(0).max(2)
            })
        })
    ])

})
type BuilderSchema = z.infer<typeof builderSchema>

const Builder = ({ nodes, selectNode, setNodes, onChange }: BuilderProps) => {
    const { updateNodeData } = useReactFlow()
    const data = selectNode?.data as DataProps

    const { register, setValue, handleSubmit, watch, reset } = useForm<BuilderSchema>({ resolver: zodResolver(builderSchema) })

    const handleBuilder = (data: BuilderSchema) => {
        console.log(data.type)
        if (!selectNode?.id) return
        updateNodeData(selectNode?.id, data)
        onChange?.()
    }

    useEffect(() => {
        if (!data) return
        reset({ ...data })
    }, [data])

    return (
        <div className="flex flex-col gap-3 p-6 border rounded-lg bg-background">
            <p>Configurações dos terminais</p>
            <Label>RX</Label>
            <Input placeholder="155,555MHz" {...register('rx')} />
            <Label>TX</Label>
            <Input placeholder="155,555MHz" {...register('tx')} />
            <Select
                value={watch('type.digital') ? 'digital' : 'analog'}
                onValueChange={(value) => {
                    setValue('type', value === 'digital' ? { digital: { slot: 0, colorCode: 0 } } : { analog: { type: 'CSQ' } })
                }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder='Selecione a tecnologia' />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tecnologias</SelectLabel>
                        <SelectItem value='analog'>Analógico</SelectItem>
                        <SelectItem value='digital'>Digital</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            {!!watch('type.analog') && <>
                <Select onValueChange={(value) => setValue('type.analog.type', value as any)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder='Selecione o silenciador' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Color code</SelectLabel>
                            <SelectItem value='CSQ'>CSQ</SelectItem>
                            <SelectItem value='TPL'>TPL</SelectItem>
                            <SelectItem value='DPL'>DPL</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </>}
            {!!watch('type.digital') && <>
                <Select onValueChange={(value) => setValue('type.digital.colorCode', +value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder='Selecione o código de cor' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Color code</SelectLabel>
                            {Array.from({ length: 16 }).map((_, value) => (
                                <SelectItem key={value} value={`${value}`}>{value}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setValue('type.digital.slot', +value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder='Selecione o slot' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Slot</SelectLabel>
                            {Array.from({ length: 2 }).map((_, value) => (
                                <SelectItem key={value} value={`${value}`}>{value}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </>}
            <Button onClick={handleSubmit(handleBuilder)}>Salvar</Button>
            {!selectNode && <span>Selecione um terminal para configura-lo ou crie um <Button variant={"link"}>novo</Button></span>}
        </div>
    )
}

export { Builder }