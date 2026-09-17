const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-orange-500",
]

const colorsBg = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500",
    "bg-pink-500", "bg-red-500", "bg-green-500", "bg-blue-500", "bg-pink-500",
    "bg-teal-500", "bg-yellow-500", "bg-orange-500", "bg-indigo-500", "bg-lime-500",
    "bg-purple-500",
]

export const getBgColorByWord = (word?: string) => {
    if (!word) return "bg-gray-400"

    const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colorsBg[hash % colorsBg.length]
}
export const getBgColorByWord_ = (word?: string) => {
    if (!word) return "hsl(0, 0%, 70%)" // cinza padrão

    // Função de hash simples
    let hash = 0
    for (let i = 0; i < word.length; i++) {
        hash = word.charCodeAt(i) + ((hash << 5) - hash)
    }

    // Gera um valor de 0 a 360 para o HUE
    const hue = Math.abs(hash) % 360

    // Saturação e luminosidade fixas pra manter legibilidade
    return `hsl(${hue}, 70%, 60%)`
}


function getColorByFirstLetter(name: string) {
    const firstChar = name.charAt(0).toUpperCase()
    const charCode = firstChar.charCodeAt(0)
    return colors[charCode % colors.length]
}
function getColorBgByFirstLetter(name?: string) {
    const firstChar = name?.charAt(0).toUpperCase()
    const charCode = firstChar?.charCodeAt(0) ?? 0
    return colorsBg[charCode % colorsBg.length]
}

const formatToBRL = (value: string | number | undefined | null) => {
    const number = typeof value === "string" ? parseFloat(value) : value
    if (typeof number !== "number" || isNaN(number)) return "R$ 0,00"

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number)
}

const resolvePromiseIn = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}

export { getColorByFirstLetter, getColorBgByFirstLetter, resolvePromiseIn, formatToBRL }