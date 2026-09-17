import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatToBRL } from "@/functions/utils"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const ViewKpi = ({ label, value, sub }: { label: string, value: ReactNode, sub?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl bg-muted/50 p-4 min-w-[160px]">
            <div className="text-lg font-semibold">{value}</div>
            <div className="text-xs text-muted-foreground">{sub ?? label}</div>
        </div>
    )
}

export const ViewMiniStat = ({ label, value, tone }: { label: string, value: React.ReactNode, tone?: "good" | "warn" | "bad" | "neutral" }) => {
    const color = tone === "good" ? "text-emerald-500" : tone === "bad" ? "text-red-500" : tone === "warn" ? "text-amber-500" : "text-foreground"
    return (
        <div className="flex-1 flex flex-col items-center justify-center rounded-xl bg-muted/50 p-3 min-w-[160px]">
            <span className={cn(`text-2xl font-semibold`, color)}>{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    )
}

export const ViewRunwayIndicator = ({ months }: { months: number | null }) => {
    const display = months == null ? "—" : `${months} mês${months === 1 ? "" : "es"}`
    const pct = months == null ? 0 : Math.min(100, (months / 12) * 100)
    const color = months == null ? "bg-muted" : months < 3 ? "bg-red-500" : months < 6 ? "bg-amber-500" : "bg-emerald-500"

    return (
        <div className="w-full p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <div className="text-sm text-muted-foreground">Runway</div>
                    <div className="text-xl font-semibold">{display}</div>
                </div>
                <div className="text-xs text-muted-foreground">Meses de autonomia</div>
            </div>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <div style={{ width: `${pct}%` }} className={`${color} h-full transition-all`} />
            </div>
        </div>
    )
}

type AgingBuckets = Record<"not_due" | "0-30" | "31-60" | "61-90" | "90+", number>

export const ViewAgingBucketsView = ({ title, buckets }: { title: string, buckets: AgingBuckets }) => {
    const total = Object.values(buckets).reduce((s, v) => s + v, 0)
    return (
        <div className="p-3 rounded-xl bg-muted/50 w-full">
            <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{formatToBRL(total)}</div>
            </div>
            <div className="flex gap-2">
                {(["not_due", "0-30", "31-60", "61-90", "90+"] as const).map((k) => {
                    const val = buckets[k] ?? 0
                    const pct = total === 0 ? 0 : Math.round((val / total) * 100)
                    const label = k === "not_due" ? "Não venc." : k
                    const color =
                        k === "not_due" ? "bg-slate-300" : k === "0-30" ? "bg-emerald-400" : k === "31-60" ? "bg-amber-400" : k === "61-90" ? "bg-orange-400" : "bg-red-500"
                    return (
                        <div key={k} className="flex-1 flex flex-col items-center text-center">
                            <div className={`w-full h-6 rounded-md ${color}`} style={{ width: `${pct}%` }} />
                            <div className="text-xs mt-1">{label}</div>
                            <div className="text-xs font-medium">{formatToBRL(val)}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const TopDebtors = ({ installments }: { installments: any[] }) => {
    // filtra parcelas INPUT pendentes ou vencidas, agrupa por suposto cliente (aqui title ou transaction?.id)
    const debtors = installments
        .filter((i) => !i.paidAt && i.value > 0) // pendentes
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)

    if (debtors.length === 0) return <div className="p-3 rounded-xl bg-muted/50">Nenhuma parcela pendente</div>

    return (
        <div className="p-3 rounded-xl bg-muted/50">
            <div className="font-semibold mb-2">Top devedores (preview)</div>
            <div className="flex flex-col gap-2">
                {debtors.map((d) => (
                    <div key={d.id} className="flex items-center justify-between">
                        <div className="text-sm truncate">{d.title ?? `Parcela #${d.id}`}</div>
                        <div className="text-sm font-medium">{formatToBRL(d.value)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ViewInstallmentsPreview = ({ installments }: { installments: any[] }) => {
    const preview = installments.slice(0, 8)
    if (!preview.length) return <div className="p-3 rounded-xl bg-muted/50">Nenhuma parcela</div>
    return (
        <div className="p-3 rounded-xl bg-muted/50">
            <div className="font-semibold mb-2">Parcelas (próximas / pendentes)</div>
            <div className="flex flex-col gap-2 text-sm">
                {preview.map((p) => (
                    <div key={p.id} className="flex items-center justify-between">
                        <div className="truncate">{p.title ?? `Parcela #${p.id}`}</div>
                        <div className="text-xs text-muted-foreground">{new Date(p.dueAt).toLocaleDateString()}</div>
                        <div className="font-medium">{formatToBRL(p.value)}</div>
                        <div className={`text-xs px-2 py-1 rounded-md ${p.status === "PAID" ? "bg-emerald-100" : p.status === "PENDING" ? "bg-amber-100" : "bg-slate-100"}`}>
                            {p.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const FlowchartAccumulatedConfig = {
    in: { label: "Entrada", color: "#2563eb" },
    out: { label: "Saída", color: "#ef4444" },
    acc: { label: "Acumulado", color: "#06b6d4" },
} satisfies ChartConfig

const chartConfig = {
    in: { label: "Entrada", color: "#2563eb" },
    out: { label: "Saída", color: "#ef4444" },
} satisfies ChartConfig

type PeriodItem = { month: string, in: number, out: number, acc: number }

export const ViewHistoryAccumulated = ({ data }: { data: PeriodItem[] }) => {
    return (
        <ChartContainer config={FlowchartAccumulatedConfig} className="min-h-[360px] w-full">
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="in" stroke="#06b6d4" activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="out" stroke="#ef4444" />
                    <Line type="monotone" dataKey="acc" stroke="#2563eb" />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

export const ViewHistoryRevenue = ({ data }: { data: PeriodItem[] }) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[360px] w-full">
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="in" fill="var(--color-in)" radius={4} />
                    <Bar dataKey="out" fill="var(--color-out)" radius={4} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}