'use client'

import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Slider } from "@/src/components/ui/slider"
import { cn } from "@/src/lib/utils"
import { MapPin } from "lucide-react"
import { useState } from "react"

export const CoverageEstimator = () => {

    const [terrain, setTerrain] = useState<'FLAT' | 'HILLS' | 'FOREST'>('FLAT')
    const [typeTerminal, setTypeTerminal] = useState<'HANDHELD' | 'VEHICLE' | 'FIXED'>('HANDHELD')
    const [height, setHeight] = useState(20)
    const [txPower, setTxPower] = useState(25)

    const terminalFactors = {
        HANDHELD: { gain: 0.5, basePower: 5 },
        VEHICLE: { gain: 1.1, basePower: 25 },
        FIXED: { gain: 1.4, basePower: 50 },
    } as const

    const current = terminalFactors[typeTerminal] ?? terminalFactors.HANDHELD
    const lineOfSight = Math.round(3.57 * (Math.sqrt(height) * Math.sqrt(1.5)))
    const terrainFactor = terrain === 'FLAT' ? 1 : terrain === 'HILLS' ? 0.7 : 0.5
    const heightFactor = Math.sqrt(height / 10)

    const baseRangeKm = 10
    const practicalRangeKm = Math.round(baseRangeKm * terrainFactor * current.gain * heightFactor * 10) / 10

    const errorMargin = 0.5 * practicalRangeKm
    const minRange = Math.max(0, Math.round((practicalRangeKm - errorMargin) * 10) / 10)
    const maxRange = Math.round((practicalRangeKm + errorMargin) * 10) / 10

    return (
        <div className="p-6 border rounded-md bg-white dark:bg-slate-800">
            <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-amber-600" />
                <div>
                    <div className="font-semibold">Calculadora rápida de cobertura (estimativa)</div>
                    <div className="text-sm text-muted-foreground">Valores aproximados apenas para planejamento inicial.</div>
                </div>
            </div>

            <div className="mt-4 space-y-4">
                <label className="text-sm font-medium">Terreno</label>
                <div className="flex gap-2">
                    {(['FLAT', 'HILLS', 'FOREST'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTerrain(t)}
                            className={`px-3 py-1 rounded ${terrain === t ? 'bg-amber-200' : 'bg-slate-100 dark:bg-slate-700'}`}
                        >
                            {t === 'FLAT' ? 'Plano' : t === 'HILLS' ? 'Ondulado' : 'Mata'}
                        </button>
                    ))}
                    <RadioGroup
                        value={typeTerminal}
                        onValueChange={(value) => setTypeTerminal(value as 'HANDHELD' | 'VEHICLE' | 'FIXED')}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="HANDHELD" id="option-one" />
                            <Label htmlFor="option-one">Portátil</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="FIXED" />
                            <Label htmlFor="option-two">Fixo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="VEHICLE" />
                            <Label htmlFor="option-two">Veiculo</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label className="text-sm font-medium">Altura da torre (m)</Label>
                    <Slider
                        defaultValue={[20]}
                        max={60}
                        min={15}
                        step={3}
                        onValueChange={(value) => setHeight(Number(value))}
                    />
                    <span className="text-xs text-muted-foreground">Altura: {height} m</span>
                </div>

                <div>
                    <label className="text-sm font-medium">Potência TX (W)</label>
                    <Slider
                        value={[txPower]}
                        max={50}
                        min={1}
                        step={10}
                        disabled
                        onValueChange={(value) => setTxPower(Number(value))}
                    />
                    <div className="text-xs text-muted-foreground">Potência: {txPower} W</div>
                </div>

                <div className="mt-3 p-3 rounded bg-amber-50">
                    <div className="text-sm">Estimativa de alcance de raio com 1 repetidora: <strong>{practicalRangeKm} km</strong> +/-{Math.round(errorMargin)}Km</div>
                    <div className="text-sm">Linha visada: <strong>{lineOfSight} km</strong></div>
                    <div className="text-xs text-muted-foreground mt-1">Obs: isso é uma aproximação para orientar. Para números reais precisamos rodar modelagem RF + drive-test.</div>
                </div>

                <div className="flex gap-3 mt-3">
                    <a href="/zona-de-cobertura" className="px-4 py-2 bg-amber-400 rounded text-slate-900 font-semibold">Ver estudo detalhado</a>
                    <a href="/contato" className="px-4 py-2 border rounded text-sm">Pedir orçamento</a>
                </div>
            </div>
        </div>
    )

}