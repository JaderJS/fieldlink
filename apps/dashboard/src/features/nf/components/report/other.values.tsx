'use client'

import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Order } from "@/features/order/types";

const styles = StyleSheet.create({
    container: { marginBottom: 8 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
    label: { fontSize: 10 },
    value: { fontSize: 10 },
});

function formatCurrency(v: number) {
    // Ajuste se seus valores estiverem em centavos (divida por 100)
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

export default function OtherValuesBlock({ otherValues }: { otherValues: Order["otherValues"] }) {
    if (!otherValues || otherValues.length === 0) return null;

    // otherValues podem ter formatos variados. Suportamos { label, value } ou { name, amount } ou números simples.
    const normalized = otherValues.map((it: any, i: number) => {
        if (typeof it === "number") return { label: `Item ${i + 1}`, value: it };
        if (typeof it === "string") return { label: it, value: "" };
        if (it.label || it.name) return { label: it.label ?? it.name, value: it.value ?? it.amount ?? "" };
        return { label: `Item ${i + 1}`, value: it };
    });

    return (
        <View style={styles.container}>
            {normalized.map((item: any, idx: number) => (
                <View key={idx} style={styles.row}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>
                        {typeof item.value === "number" ? formatCurrency(item.value) : String(item.value ?? "")}
                    </Text>
                </View>
            ))}
        </View>
    );
}
