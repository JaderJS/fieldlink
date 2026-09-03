import { BaseEdge, Edge, EdgeProps, getSimpleBezierPath, getStraightPath } from "@xyflow/react"

interface CustomDataEdge extends Record<string, unknown> {
    isSend?: boolean
}

interface CustomEdgeProps extends EdgeProps<Edge<CustomDataEdge>> { }


const DefaultEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, ...props }: CustomEdgeProps) => {
    const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY })
    const isSend = props.data?.isSend ? true : false

    return (
        <>
            <BaseEdge id={id} path={path} />
            {isSend && <circle r="5" fill="#f58611">
                <animateMotion dur="1s" repeatCount="indefinite" path={path} >
                    <mpath href={`#${path}`} />
                </animateMotion>
            </circle>}
        </>
    )
}

export { DefaultEdge } 