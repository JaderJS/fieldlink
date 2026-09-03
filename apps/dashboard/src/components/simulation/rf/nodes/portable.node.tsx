import { Handle, NodeProps, Position, Node, useReactFlow } from "@xyflow/react"
import { PortableNodeProps, RadioDataProps } from "../types/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"
import { GearIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"


export interface OnChangePortableProps {
    nodeId: string
    newData: Partial<PortableNodeProps>
}
interface PortableNodeProps_ extends NodeProps<Node<PortableNodeProps>> {
    onClick?: (nodeId: string, data: RadioDataProps) => void
    setShowBuilder: Dispatch<SetStateAction<boolean>>
    setSelectNode: Dispatch<SetStateAction<Node | undefined>>
}

const PortableNode = ({ id, data, onClick, setShowBuilder, setSelectNode, ...props }: PortableNodeProps_) => {
    const { getInternalNode } = useReactFlow()

    const startTX = () => {
        onClick?.(id, { ...data, status: 'tx' })
    }

    const stopTX = () => {
        onClick?.(id, { ...data, status: 'idle' })
    }

    const handleConfig = () => {
        const node = getInternalNode(id)
        setSelectNode(node)
        setShowBuilder(prev => true)
    }

    return (
        <div className="relative ">
            <span className="absolute -left-1 -bottom-2 bg-foreground h-8 w-2 rounded-t-sm" />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Left} id="a" />
            <div className={
                cn(data.status === 'idle' && 'bg-emerald-500',
                    data.status === 'rx' && 'bg-orange-300',
                    data.status === 'tx' && 'bg-red-500',
                    "absolute -bottom-18 -left-5 h-28 w-16  flex flex-col gap-y-4 justify-center items-center rounded-sm")}
            >
                <div className="p-2 bg-zinc-100 rounded-sm ">
                    {!!data.type.digital && <p className="text-[0.3rem]">Modo: Digital</p>}
                    {!!data.type.analog && <p className="text-[0.3rem]">Modo: Analógico</p>}
                    <p className="text-[0.5rem]">RX:{data.rx / 1E6}MHz</p>
                    <p className="text-[0.5rem]">TX:{data.tx / 1E6}MHz</p>
                    {!!data.type.analog && <>
                        <p className="text-[0.4rem]">{data.type.analog?.type}</p>
                    </>}
                    {!!data.type.digital && <>
                        <p className="text-[0.4rem]">CC:{data.type.digital?.colorCode}</p>
                        <p className="text-[0.4rem]">SLOT:{data.type.digital?.slot}</p>
                    </>}
                </div>
                <div className="flex gap-1">
                    <Button
                        className="h-5 w-2 text-[0.5rem] nodrag"
                        onMouseDown={() => startTX()}
                        onMouseUp={() => stopTX()}
                    // onMouseLeave={() => stopTX()}
                    >PTT</Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-5 w-5"
                        onClick={handleConfig}
                    >
                        <GearIcon className="h-1 w-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { PortableNode }