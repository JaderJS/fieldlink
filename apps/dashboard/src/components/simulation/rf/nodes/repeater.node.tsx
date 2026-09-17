import { Handle, NodeProps, Position, Node } from "@xyflow/react"
import { PortableNodeProps } from "../types/types"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUp, Wifi } from "lucide-react"
import { GearIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Tower from "@/icons/tower"


export interface OnChangePortableProps {
    nodeId: string
    newData: Partial<PortableNodeProps>
}
interface RepeaterNodeProps_ extends NodeProps<Node<PortableNodeProps>> {
    onChange: ({ nodeId, newData }: OnChangePortableProps) => void
}

const RepeaterNode = ({ id, data, onChange, ...props }: RepeaterNodeProps_) => {
    return (
        <div className="relative lex flex-col items-center justify-center text-center scale-150">

            <Wifi className="absolute w-10 h-10 rotate-90 -top-5 left-3" />
            <Wifi className="absolute w-10 h-10 -rotate-90 -top-5 -left-3" />

            <div className="relative w-0 h-0 border-l-20 border-r-20 border-b-40 border-l-transparent border-r-transparent border-b-fieldlink-secondary mt-1"></div>
            <div className="absolute p-3 rounded-sm -inset-x-5">
                <p className="text-[0.5rem]">RX:{data.rx / 1E6}MHz</p>
                <p className="text-[0.5rem]">TX:{data.tx / 1E6}MHz</p>
                <p className="text-[0.4rem]">{data.type.analog?.type}</p>
                {data.status === 'broadcast' && <p className="text-[0.4rem]">broadcasting...</p>}
            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Top} />

        </div>
    )
}

export { RepeaterNode }