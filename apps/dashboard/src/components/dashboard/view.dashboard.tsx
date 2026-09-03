'use client'

import { getBanksDashboard, getHealth } from "@/functions/dashboard"
import { useQuery } from "@tanstack/react-query"
import { formatToBRL } from "../utils"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { KEYS } from "@/core/keys"
import { ViewBanksDashboard } from "./view.banks"
import { useDashboard } from "./hooks/use.dashboard"
import { useMemo, useState } from "react"
import { TopDebtors, ViewAgingBucketsView, ViewInstallmentsPreview, ViewKpi, ViewMiniStat, ViewRunwayIndicator } from "./components/view.helpers"
import { averageNetLastMonths } from "./helpers/utils"
import { Button } from "@/components/ui/button"

type AgingBuckets = Record<"not_due" | "0-30" | "31-60" | "61-90" | "90+", number>
type PeriodItem = { month: string, in: number, out: number, acc: number }


const ViewDashboard = () => {

    const { data } = useDashboard()

    const [simulateCash, setSimulateCash] = useState<number | null>(null)

    const transactionsOnPeriods: PeriodItem[] = data?.transactionsOnPeriods ?? []
    const agingReceivables: AgingBuckets = (data?.aging?.receivables as AgingBuckets) ?? { not_due: 0, "0-30": 0, "31-60": 0, "61-90": 0, "90+": 0 }
    const agingPayables: AgingBuckets = (data?.aging?.payables as AgingBuckets) ?? { not_due: 0, "0-30": 0, "31-60": 0, "61-90": 0, "90+": 0 }
    const projectedCashflow = data?.projectedCashflow ?? []
    const installments = data?.inPeriod?.installments ?? []

    const balance = data?.total?.balance ?? 0
    const totalIn = data?.total?.in ?? 0
    const totalOut = data?.total?.out ?? 0
    const notBilledIn = data?.notBilled?.in ?? 0
    const notBilledOut = data?.notBilled?.out ?? 0
    const pmp = Number(data?.pmp ?? 0)
    const pmr = Number(data?.pmr ?? 0)
    const runwayMonths = simulateCash != null ? Math.floor((simulateCash * 1) / Math.max(1, averageNetLastMonths(transactionsOnPeriods, 3))) : data?.runwayMonths

    const burnRate = useMemo(() => {
        const last = transactionsOnPeriods.slice(-3)
        if (!last.length) return 0
        const nets = last.map((m) => m.out - m.in)
        const avg = nets.reduce((s, x) => s + x, 0) / last.length
        return Math.max(0, avg)
    }, [transactionsOnPeriods])

    const avgMonthlyOut = useMemo(() => {
        const last = transactionsOnPeriods.slice(-3)
        if (!last.length) return 0
        return last.reduce((s, m) => s + m.out, 0) / last.length
    }, [transactionsOnPeriods])

    const liquidityRatio = avgMonthlyOut === 0 ? null : balance / avgMonthlyOut

    const totalReceivables = Object.values(agingReceivables).reduce((s, v) => s + v, 0)
    const receivablesTurnover = totalReceivables === 0 ? null : totalIn / totalReceivables

    const provisionDoubtful = (agingReceivables["90+"] ?? 0) * 0.5

    const topDebtors = installments
        .filter((i: any) => {
            return !i.paidAt && (i.status === "PENDING" || i.status === "PARTIAL" || new Date(i.dueAt) < new Date());
        })
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 6);



    return (
        <div className="flex flex-wrap gap-3 h-full p-6">
            {/* TOP KPIs */}
            <div className="w-full flex flex-wrap gap-3">
                <div className="flex-1 rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
                    <div>
                        <div className="text-sm text-muted-foreground">Saldo de caixa</div>
                        <div className="text-4xl font-semibold">{formatToBRL(balance)}</div>
                        <div className="text-xs text-muted-foreground mt-1">Delta mensal: {/* opcional: calcular */}</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button className="btn" onClick={() => setSimulateCash(null)}>Usar saldo atual</Button>
                        <Button
                            className="btn"
                            onClick={() => {
                                const x = prompt("Simular saldo (R$) — ex: 10000.50");
                                if (!x) return;
                                const n = Number(x.replace(/[^\d.-]/g, ""));
                                if (!isNaN(n)) setSimulateCash(n);
                            }}
                        >
                            Simular saldo
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex gap-3">
                    <ViewKpi label="Receita total" value={formatToBRL(totalIn)} />
                    <ViewKpi label="Despesas totais" value={formatToBRL(totalOut)} />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <ViewMiniStat label="PMP (dias)" value={`${pmp.toFixed(0)}d`} tone={pmp > 60 ? "warn" : "neutral"} />
                    <ViewMiniStat label="PMR (dias)" value={`${pmr.toFixed(0)}d`} tone={pmr > 60 ? "warn" : "neutral"} />
                </div>
            </div>

            {/* Row: Banks + not billed */}
            <div className="w-full flex flex-wrap gap-3">
                <div className="rounded-xl bg-muted/50 flex-1 p-3">
                    <ViewBanksDashboard />
                </div>

                <div className=" rounded-xl bg-muted/50 flex-1 p-4">
                    <div className="flex flex-col gap-6 h-full justify-center items-center">
                        <div className="text-center lg:mt-6 mt-2">
                            <div className="text-5xl font-semibold text-emerald-500">{formatToBRL(notBilledIn)}</div>
                            <div className="text-xs text-muted-foreground">Contas a receber previstas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-semibold text-red-500">{formatToBRL(notBilledOut)}</div>
                            <div className="text-xs text-muted-foreground">Contas a pagar previstas</div>
                        </div>
                        <div className="w-full mt-2">
                            <ViewRunwayIndicator months={runwayMonths ?? null} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="w-full grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3">
                    <div className="font-semibold mb-2">Histórico (Receita / Despesa)</div>
                    <ViewHistoryRevenue data={transactionsOnPeriods} />
                </div>

                <div className="rounded-xl bg-muted/50 p-3">
                    <div className="font-semibold mb-2">Acumulado</div>
                    <ViewHistoryAccumulated data={transactionsOnPeriods} />
                </div>

                <div className="rounded-xl bg-muted/50 p-3">
                    <div className="font-semibold mb-2">Projeção de Caixa (próx. meses)</div>
                    <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={projectedCashflow}>
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="inflow" fill="#16a34a" radius={4} name="Inflow" />
                                <Bar dataKey="outflow" fill="#ef4444" radius={4} name="Outflow" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>

                <div className="rounded-xl bg-muted/50 p-3 flex flex-col gap-3">
                    <div className="font-semibold">Aging - Recebíveis</div>
                    <ViewAgingBucketsView title="Recebíveis" buckets={agingReceivables} />
                    <div className="font-semibold mt-2">Aging - Pagáveis</div>
                    <ViewAgingBucketsView title="Pagáveis" buckets={agingPayables} />
                </div>
            </div>

            {/* Lower row: metrics + lists */}
            <div className="w-full grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-muted/50 p-4">
                    <div className="font-semibold mb-3">Métricas derivadas</div>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <div>Burn rate (méd. 3m)</div>
                            <div className="font-medium">{formatToBRL(burnRate)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Liquidity ratio (saldo / despesas méd.)</div>
                            <div className="font-medium">{liquidityRatio == null ? "—" : liquidityRatio.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Receivables turnover</div>
                            <div className="font-medium">{receivablesTurnover == null ? "—" : receivablesTurnover.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Provision for doubtful (50% 90+)</div>
                            <div className="font-medium">{formatToBRL(provisionDoubtful)}</div>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground">
                            Dica: clique em qualquer KPI para ver o detalhe e disparar ações (cobrança, renegociação, simulação).
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-muted/50 p-4 col-span-2">
                    <div className="grid grid-cols-2 gap-3">
                        <TopDebtors installments={topDebtors} />
                        <ViewInstallmentsPreview installments={installments} />
                    </div>
                </div>
            </div>
        </div>
    )

}

const FlowchartAccumulatedConfig = {
    in: {
        label: "Entrada",
        color: "#2563eb",
    },
    out: {
        label: "Saída",
        color: "#60a5fa",
    },
    acc: {
        label: "Acumulado",
        color: "#60E5fa",
    }
} satisfies ChartConfig

const ViewHistoryAccumulated = ({ data }: { data: any[] }) => {

    return (
        <>
            <ChartContainer config={FlowchartAccumulatedConfig} className="min-h-[400px] w-full">
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="in" stroke="#00ff00" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="out" stroke="#ff0000" />
                    <Line type="monotone" dataKey="acc" stroke="#0000ff" />
                </LineChart>
            </ChartContainer>
        </>
    )
}

const chartConfig = {
    in: {
        label: "Entrada",
        color: "#2563eb",
    },
    out: {
        label: "Saída",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const ViewHistoryRevenue = ({ data }: { data: any[] }) => {

    return (
        <>
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                <BarChart accessibilityLayer data={data}>
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
            </ChartContainer>
        </>
    )
}


export { ViewDashboard }