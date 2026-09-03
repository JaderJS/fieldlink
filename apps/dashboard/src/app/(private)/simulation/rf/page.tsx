import { SimulationBuilderRF } from "@/components/simulation/rf/simulation.builder.rf"
import { ReactFlowProvider } from "@xyflow/react"


export default function RF() {
    return (
        <ReactFlowProvider>
            <SimulationBuilderRF />
        </ReactFlowProvider>
    )
}