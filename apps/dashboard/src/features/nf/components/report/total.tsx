// src/features/order/report/TotalsBlock.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Order } from "@/features/order/types";

type Work = Order['works'][number]
type Sale = Order['sales'][number]

const styles = StyleSheet.create({
    container: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#ddd" },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
    label: { fontSize: 11 },
    value: { fontSize: 11, fontWeight: "bold" },
    bigTotal: { fontSize: 13, fontWeight: "bold", marginTop: 6, textAlign: "right" },
});

function formatCurrency(v: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

export default function TotalsBlock({ order }: { order: Order }) {
    const worksTotal = (order.works ?? []).reduce((s: number, w: Work) => s + (Number(w.total) || 0), 0);
    const salesTotal = (order.sales ?? []).reduce((s: number, sObj: Sale) => s + (Number(sObj.total) || 0), 0);

    const otherValuesTotal = (order.otherValues ?? []).reduce((s: number, v: any) => {
        if (typeof v === "number") return s + v;
        if (v && (typeof v.value === "number" || typeof v.amount === "number")) return s + (v.value ?? v.amount ?? 0);
        return s;
    }, 0);

    const subtotal = worksTotal + salesTotal + otherValuesTotal;
    const discount = Number(order.discount ?? 0);
    // Se order.total já existir, usamos ele como total final; senão, calculamos.
    const grandTotal = typeof order.total === "number" && order.total !== 0 ? Number(order.total) : subtotal - discount;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Subtotal (Serviços + Produtos)</Text>
                <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
            </View>

            {discount > 0 && (
                <View style={styles.row}>
                    <Text style={styles.label}>Desconto</Text>
                    <Text style={styles.value}>- {formatCurrency(discount)}</Text>
                </View>
            )}

            {(order.otherValues && order.otherValues.length > 0) && (
                <View style={styles.row}>
                    <Text style={styles.label}>Outros valores (total)</Text>
                    <Text style={styles.value}>{formatCurrency(otherValuesTotal)}</Text>
                </View>
            )}

            <Text style={styles.bigTotal}>Total: {formatCurrency(grandTotal)}</Text>
        </View>
    );
}
