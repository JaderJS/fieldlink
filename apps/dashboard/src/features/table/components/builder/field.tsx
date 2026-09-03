import { Row } from "@tanstack/react-table"
import { NumberField } from "./fields/number.field"
import { TextField } from "./fields/text.field"
import { UnknownField } from "./fields/unknown.field"
import { ColumnOptions } from "./index"
import { DateField } from "./fields/date.field"
import { CheckboxField } from "./fields/checkbox.field"
import { MoneyField } from "./fields/money.field"
import { SwitchField } from "./fields/switch.field"

export type FieldsType = "text" | "number" | "checkbox" | "date" | "money" | "switch" | "unknown"

export type CustomFieldElement = {
    type: FieldsType
    render: React.FC<{
        context: FormFieldInstance,
    }>
}

export type FormFieldInstance<TData = any> = {
    path: string
    row: Row<TData>
    rowIndex: number
    columnId: string
    meta?: {
        onUpdate?: (params: {
            rowIndex: string
            columnId: string
            value: unknown
        }) => void
        onRemove?: (rowIndex: number) => void
        onSubmit?: () => void
    }
}

export type FormFieldsType = {
    [key in FieldsType]: CustomFieldElement
}

export const fieldElements: FormFieldsType = {
    text: TextField,
    number: NumberField,
    money: MoneyField,
    date: DateField,
    checkbox: CheckboxField,
    switch: SwitchField,
    unknown: UnknownField
}