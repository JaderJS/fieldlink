

export interface NodeDataProps extends Record<string, unknown> {
    label: string
    rx: number
    tx: number
    type: RadioAnalogProps
}


interface RadioAnalogProps {
    sql: "CSQ" | "TPL" | "DPL"
    encoder?: number
    decoder?: number
}

export interface RadioDataProps {
    rx: number
    tx: number
    status: 'tx' | 'rx' | 'idle'
    isMesh?: boolean
}

export interface PortableNodeProps extends Record<string, unknown> {
    label: string
    status: 'tx' | 'rx' | 'idle' | 'broadcast'
    rx: number
    tx: number
    type: {
        analog?: {
            type: 'CSQ' | 'TPL' | 'DPL'
            encoder?: number
            decoder?: number
        }
        digital?: {
            colorCode: number
            slot: number
        }
    }
}