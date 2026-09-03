import { createId } from '@paralleldrive/cuid2'
import logo from '@/../public/logo.png'
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatToBRL } from '@/components/utils'

const styles = StyleSheet.create({
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: "Courier",
    fontSize: 12,
    marginVertical: 2,
  },
  dots: {
    flex: 1,
    overflow: "hidden",
  },

  page: {
    padding: 64,
    fontSize: 12,
    fontFamily: 'Courier',
    lineHeight: 1.8
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  subHeader: {
    textAlign: 'left',
    lineHeight: 1.2
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    flexDirection: 'row',
    marginRight: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    fontSize: 10,
    justifyContent: 'space-between',
    borderBottom: '0.5 solid #ccc',
    paddingVertical: 2,
  },
  total: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalLine: {
    fontSize: 12,
    fontFamily: 'Courier',
    whiteSpace: 'pre', // ajuda a manter espaçamento com pontos
  },
  logo: {
    justifySelf: "",
    width: 40,
    height: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    lineHeight: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 10,
    left: 64,
    right: 64,
    paddingBottom: 24,
  },

})

interface Item {
  id?: number
  qtd: number
  und?: "und" | "m" | "g" | "l"
  name: string
  value: number
  description?: string
}

export interface NfProps {
  emitter: {
    name: string
    cnpj: string
  }
  client: {
    id?: number,
    name: string,
    property: string,
    state: string,
    cnpj: string,
    town: string,
  }
  type?: string,
  itens: Item[]
  otherValues?: Item[]
  discount?: {
    percent: number
    value: number
  }
  obs?: string
}

export const Nf = ({ emitter, client, itens, otherValues = [], discount, type = "Orçamento", obs }: NfProps) => {


  const groupedItens = groupItems(itens)
  const groupedOtherValues = groupItems(otherValues)

  // const valorTotal = itens.reduce((acc, item) => acc + item.qtd * item.value, 0) +
  //   otherValues.reduce((acc, item) => acc + item.qtd * item.value, 0)
  const valorTotal = groupedItens.reduce((acc, item) => acc + item.qtd * item.value, 0) +
    groupedOtherValues.reduce((acc, item) => acc + item.qtd * item.value, 0)
  //#009300 #f58611  #010d24
  return (
    <Document>
      <Page
        size={"A4"}
        style={styles.page}
      >
        <View style={styles.header}>
          <Text>Link Network</Text>
        </View>
        <View style={styles.subHeader}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text>{emitter.name}</Text>
            <Text>{emitter.cnpj}</Text>
          </View>
          <Text>Colíder - MT</Text>
        </View>

        <View style={{ borderBottom: 1, borderBottomColor: '#000', marginVertical: 8 }} />

        <View style={styles.section}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text><Text style={styles.label}>Propriedade: </Text>{client.property}</Text>
            <Text><Text style={styles.label}>CNPJ: </Text>{client.cnpj}</Text>
          </View>
          <Text><Text style={styles.label}>Cliente:</Text> {client.name}</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text><Text style={styles.label}>Cidade: </Text>{client.town}</Text>
            <Text><Text style={styles.label}>Estado: </Text>{client.state}</Text>
          </View>
        </View>

        <View style={{ borderBottom: 1, borderBottomColor: '#000', marginVertical: 8 }} />

        <Text>Natureza da operação: {type}</Text>

        <View style={styles.tableHeader}>
          <Text style={{ flex: 1 }}>Qtd</Text>
          <Text style={{ flex: 3 }}>Descrição</Text>
          <Text style={{ flex: 1 }}>Unitário</Text>
          <Text style={{ flex: 1 }}>Parcial</Text>
        </View>

        {groupedItens.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{item.qtd} {item.und === 'und' ? "" : item.und}</Text>
            <Text style={{ flex: 3 }}> {item.name.length > 25 ? item.name.slice(0, 28) + '…' : item.name}</Text>
            <Text style={{ flex: 1 }}>{formatToBRL(item.value.toFixed(2))}</Text>
            <Text style={{ flex: 1 }}>{formatToBRL((item.qtd * item.value).toFixed(2))}</Text>
          </View>
        ))}

        {/* Quantidades maiores que 1 */}
        {(otherValues || []).filter(i => i.qtd > 1).map((i, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={{ flex: 1 }}>{i.qtd} {i.und === 'und' ? "" : i.und}</Text>
            <Text style={{ flex: 3 }}>
              {i.name.length > 25 ? i.name.slice(0, 28) + '…' : i.name}
            </Text>
            <Text style={{ flex: 1 }}>{formatToBRL(i.value.toFixed(2))}</Text>
            <Text style={{ flex: 1 }}>{formatToBRL((i.qtd * i.value).toFixed(2))}</Text>
          </View>
        ))}

        {otherValues?.filter(i => !i.qtd || i.qtd <= 1)?.map((item, index) => (
          <Text key={index} style={{ ...styles.totalLine, marginTop: index === 0 ? 6 : 0, fontSize: 11 }}>
            {formatTotalLine(item.name, (item.value * item.qtd).toFixed(2))}
          </Text>
        ))}

        {!!discount && discount.percent !== 0 && <Text style={{ ...styles.totalLine, color: "#009300", marginTop: 2 }}>
          {formatTotalLine(`Desconto de ${discount.percent.toFixed(2)}%`, `${((valorTotal) * (discount.percent / 100)).toFixed(2)}`)}
        </Text>}

        <Text style={{ ...styles.totalLine, fontWeight: "bold", marginTop: 8 }}>
          {formatTotalLine('Valor total', `${discount?.percent === 0 ? valorTotal : valorTotal * (1 - (discount?.percent ?? 0) / 100)}`, 65)}
        </Text>

        {obs && <Text style={{ marginTop: 6 }}>{obs}</Text>}

        <Text style={{ marginTop: 32 }}>{format(new Date(), "PPP", { locale: ptBR })}</Text>

        <View fixed style={styles.footer}>
          <Image style={styles.logo} src={"http://localhost:3000/logo.png"} />
          <View style={{ flex: 1, textAlign: "right", alignItems: 'flex-end' }}>
            <Link href='https://fieldlink.net.br' style={{ textDecoration: "none", color: "#000" }}>
              <Text style={{ fontWeight: "bold" }}>
                {/* {emitter.name} */}
                https://fieldlink.net.br
              </Text>
            </Link>
            <Text style={{ color: "grey" }}>{createId()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const formatTotalLine = (label: string, value: string, totalChars = 66) => {
  const formattedValue = formatToBRL(value)

  const words = label.split(" ")
  const lines: string[] = []
  let current = ""

  words.forEach(w => {
    const test = current.length === 0 ? w : current + " " + w
    if (test.length > totalChars - formattedValue.length - 1) {
      lines.push(current)
      current = w
    } else {
      current = test
    }
  })

  if (current) lines.push(current)

  const last = lines[lines.length - 1]

  const line = `${last}${formattedValue}`
  const dotsNeeded = totalChars - (last.length + formattedValue.length)

  const dottedLastLine = last + ".".repeat(Math.max(0, dotsNeeded)) + formattedValue

  return [...lines.slice(0, -1), dottedLastLine].join("\n")
}

const groupItems = (items: Item[]) => {
  const map = new Map<string, Item>()
  for (const it of items || []) {
    const key = `${normalizeString(it.name)}|${Number(it.value).toFixed(2)}`
    if (!map.has(key)) {
      map.set(key, { ...it })
    } else {
      const existing = map.get(key)!
      existing.qtd = Number(existing.qtd) + Number(it.qtd)
    }
  }
  return Array.from(map.values())
}

const normalizeString = (str: string) => {
  if (!str) return ""
  const separated = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

  return separated
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}