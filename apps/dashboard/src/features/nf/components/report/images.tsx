// src/features/order/report/WorkImagesBlock.tsx
import React, { useEffect } from "react"
import { View, Image, StyleSheet, Text } from "@react-pdf/renderer"
import { Archive } from "@/features/archive/types";

const styles = StyleSheet.create({
    container: { marginTop: 10, marginBottom: 10 },
    grid: { flexDirection: "row", flexWrap: "wrap" },
    item: {
        width: "48%",
        marginBottom: 10,
        marginRight: "4%",
    },
    img: {
        width: "100%",
        height: 140,
    },
    title: {
        fontSize: 11,
        marginBottom: 6,
        fontWeight: "bold"
    }
})

function base64ToDataUrl(base64: string, mime = "image/png"): string {
    if (base64.startsWith("data:")) return base64
    return `data:${mime};base64,${base64}`
}

export default function WorkImagesBlock({ archives }: { archives: Archive[] }) {
    if (!archives || archives.length === 0) return null;
    const images = archives
        .map((a) => (a as any).base64)
        .filter(Boolean);

    if (images.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Imagens do Serviço</Text>

            <View style={styles.grid}>

                {images.length !== 0 && images.map((src, idx) => (
                    <View key={idx} style={styles.item}>
                    </View>
                ))}
            </View>
        </View>
    )
}
