import { StyleSheet } from "@react-pdf/renderer"

export const styles = StyleSheet.create({
    page: {
        padding: 24,
        fontSize: 11,
        fontFamily: "Helvetica"
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18
    },

    logo: {
        width: 80,
        marginRight: 12
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },

    headerSubtitle: {
        fontSize: 12,
        marginTop: 4
    },

    sectionTitle: {
        fontSize: 14,
        marginTop: 16,
        marginBottom: 6,
        fontWeight: "bold",
        borderBottom: "1px solid #000",
        paddingBottom: 3
    },

    block: {
        marginBottom: 12
    },

    workBlock: {
        marginBottom: 18
    },

    workTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 4
    },

    subSection: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 3
    },

    table: {
        marginTop: 4
    },

    tableRow: {
        flexDirection: "row",
        marginBottom: 2
    },

    col1: { width: "52%" },
    col2: { width: "12%" },
    col3: { width: "18%" },
    col4: { width: "18%", textAlign: "right" },

    totalFinal: {
        fontSize: 13,
        fontWeight: "bold",
        marginTop: 6
    },

    signature: {
        marginTop: 30,
        textAlign: "center"
    }
})
