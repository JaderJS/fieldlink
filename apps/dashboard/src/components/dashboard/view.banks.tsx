'use client'

import { getBanksDashboard } from "@/functions/dashboard"
import { useQuery } from "@tanstack/react-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { formatToBRL } from "@/functions/utils"

const SHOW_VALUES = {
    min: "Mínimo",
    max: "Máximo",
    input: "Entrada",
    out: "Saída",
    maxIn: "Entrada Máxima",
    maxOut: "Saída Máxima",
    balance: "Balanço",
} as const;

type ShowValuesKey = keyof typeof SHOW_VALUES;

const formatLabel = (key: ShowValuesKey) => SHOW_VALUES[key] || key;

export const ViewBanksDashboard = () => {

    const { data: banks } = useQuery({
        queryKey: ['get-dashboard-banks'],
        queryFn: getBanksDashboard,
        select: data => data.banks,
    })

    return (
        <>
            {banks?.length !== 0 && <Tabs className="w-full h-full" defaultValue={`${banks?.find(({ isDefault }) => isDefault)?.id}`}>
                <TabsList className={`w-full flex`}>
                    {banks?.map(({ id, name }) => (
                        <TabsTrigger key={id} value={String(id)}>{name}</TabsTrigger>
                    ))}
                </TabsList>
                {banks?.map(({ id, name, out, in: input, maxIn, maxOut, minIn, minOut, balance, transactions, isDefault, ...b }) => (
                    <TabsContent key={id} value={String(id)} className="flex flex-col space-y-2">
                        {Object.entries({ input, out, maxIn, maxOut, balance, ...b }).map(([key, value]) => (
                            <div key={key} className="flex justify-between px-12">
                                <span>{formatLabel(key as any)}</span>
                                <span className="grow border-b-2 border-black border-dotted mx-2 mb-2"></span>
                                <span>{typeof value === "number" ? formatToBRL(value) : String(value)}</span>
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>}

        </>
    )
}