'use client'

import { Background, NodeTypes, OnNodeDrag, ReactFlow, useEdgesState, useNodesState, Node, useReactFlow, useStoreApi, Edge, Panel } from "@xyflow/react"
import { SIMULATION } from "./constants"
import { useCallback, useMemo, MouseEvent, useState, useRef } from "react"
import { PortableNode } from "./nodes/portable.node"
import { DefaultEdge } from "./edges/default"
import { RepeaterNode } from "./nodes/repeater.node"
import { Builder } from "./builder"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { RadioDataProps } from "./types/types"
import '@xyflow/react/dist/style.css'

const SimulationBuilderRF = () => {

    const store = useStoreApi()
    const [nodes, setNodes, onNodesChange] = useNodesState(SIMULATION.POINT_TO_POINT_01.NODES as Node[])
    const [edges, setEdges, onEdgesChange] = useEdgesState(SIMULATION.POINT_TO_POINT_01.EDGES as Edge[])
    const tempEdgesRef = useRef<Edge[]>([])
    const [selectNode, setSelectNode] = useState<Node | undefined>(undefined)
    const [showBuilder, setShowBuilder] = useState(false)
    const MIN_DISTANCE = 500
    const { getInternalNode } = useReactFlow()

    const handleSelectNode = (nodeId: string) => {
        const node = nodes.find(node => node.id === nodeId)
        setSelectNode(node)
    }

    const edgeTypes = useMemo(() => ({
        animatedSVG: DefaultEdge
    }), [])

    const togglePtt = (nodeId: string, data: RadioDataProps) => {
        const nodesLinkWithRepeater = Array.from(new Set(edges.flatMap(edge => [edge.source, edge.target])))
        const repeater = nodes.find((node) => node.type === 'repeater')

        setNodes(nodes => {
            return nodes.map(node => {

                if (data.status === 'idle') {
                    return { ...node, data: { ...node.data, status: 'idle' } }
                }
                if (nodeId === node.id) {
                    return { ...node, data: { ...node.data, status: 'tx' } }
                }
                if (data.tx === repeater?.data.rx) {
                    if (repeater?.data.tx === node.data.rx) {
                        return { ...node, data: { ...node.data, status: 'rx' } }
                    }
                }
                if (data.tx === node.data.rx) {
                    return { ...node, data: { ...node.data, status: 'rx' } }
                }

                return node
            })
        })

    }

    const nodeTypes = useMemo(() => ({
        repeater: (props: any) => <RepeaterNode {...props} />,
        portable: (props: any) => <PortableNode onClick={togglePtt} setSelectNode={setSelectNode} setShowBuilder={setShowBuilder} {...props} />,
        mobile: (props: any) => <PortableNode {...props} />
    }), [])

    const getClosedEdges = useCallback((node: Node) => {
        const { nodeLookup } = store.getState()
        const internalNode = getInternalNode(node.id)

        if (!internalNode) {
            return []
        }

        const closeNodes = Array.from(nodeLookup.values()).reduce((res: any[], n) => {

            const { tx, rx } = internalNode.data as unknown as RadioDataProps

            if (n.id !== internalNode?.id) {

                if (tx !== n.data.rx) {
                    return res
                }
                if (rx !== n.data.tx) {
                    return res
                }

                const dx = n.internals.positionAbsolute.x - internalNode.internals.positionAbsolute.x
                const dy = n.internals.positionAbsolute.y - internalNode.internals.positionAbsolute.y
                const d = Math.sqrt(dx * dx + dy * dy)

                if (d < MIN_DISTANCE) {
                    const closeNodeIsSource = n.internals.positionAbsolute.x < internalNode.internals.positionAbsolute.x

                    const sourceNode = closeNodeIsSource ? n : internalNode
                    const targetNode = closeNodeIsSource ? internalNode : n

                    if (sourceNode.data.rx === targetNode.data.tx || sourceNode.data.tx === targetNode.data.rx) {
                        res.push({
                            id: closeNodeIsSource ? `${n.id}-${node.id}` : `${node.id}-${n.id}`,
                            source: closeNodeIsSource ? n.id : node.id,
                            target: closeNodeIsSource ? node.id : n.id,
                        })
                    }
                }
            }
            return res
        }, [])

        return closeNodes

    }, [])

    const handleNodeDrag = useCallback((event: any, node: Node) => {

        const closeEdge = getClosedEdges(node) as Edge[]

        setEdges((prevEdges) => {
            const persistentEdges = prevEdges.filter((edge) => edge.className === 'temp' && edge.source !== node.id && edge.target !== node.id)

            const newEdges = closeEdge.reduce((acc: Edge[], edge) => {
                if (!acc.find((existingEdge) => existingEdge.source === edge.source && existingEdge.target === edge.target)) {
                    acc.push({ ...edge, className: 'temp', type: 'animatedSVG' })
                }
                return acc
            }, [])

            tempEdgesRef.current = [...newEdges, ...persistentEdges]

            return [...newEdges, ...persistentEdges]
        })
    }, [getClosedEdges, setEdges, selectNode])

    return (
        <ReactFlow
            fitView
            fitViewOptions={{ padding: 0.5 }}
            defaultEdgeOptions={{ animated: true }}

            nodes={nodes}
            edges={edges}

            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}

            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDrag={handleNodeDrag}
        >
            <Panel position="top-right" className="flex gap-1 top-0">
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                        setShowBuilder((prev) => !prev)
                        setSelectNode(undefined)
                    }}
                >
                    {!showBuilder ? <ArrowLeft /> : <ArrowRight />}
                </Button>
                {showBuilder && <Builder
                    nodes={nodes}
                    setNodes={setNodes}
                    selectNode={selectNode}
                    onChange={() => {
                        if (!selectNode) return
                        handleNodeDrag({}, selectNode)
                    }}
                />}
            </Panel>
            <Background />
        </ReactFlow>
    )
}

export { SimulationBuilderRF }