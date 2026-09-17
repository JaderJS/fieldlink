import React from "react"
import { TextFieldFormElement } from "../fields/text.field"
import { TitleFieldForm } from "../fields/title.field"
import { SubtitleFieldForm } from "../fields/subtitle.field"
import { ParagraphFieldForm } from "../fields/paragraph.field"
import { NumberFieldForm } from "../fields/number.field"
import { TextareaForm } from "../fields/textarea.field"
import { DateFieldForm } from "../fields/date.field"
import { SelectFieldForm } from "../fields/select.field"
import { CheckboxForm } from "../fields/checkbox.field"

export type FieldsType =
    | 'TextField'
    | 'TitleField'
    | 'SubtitleField'
    | "ParagraphField"
    | "NumberField"
    | 'TextAreaField'
    | 'DateField'
    | 'SelectField'
    | 'CheckboxField'

export type SubmitFunction = (key: string, value: string) => void

export type FormField = {
    type: FieldsType

    construct: (id: string) => FormFieldInstance

    designerBtnElement: {
        icon: React.ElementType,
        label: string
    }

    designerComponent: React.FC<{
        fieldInstance: FormFieldInstance
    }>
    formComponent: React.FC<{
        fieldInstance: FormFieldInstance
        promise?: () => Promise<void>
        submitValue?: (key: string, value: string) => void
        isInvalid?: boolean
        isLoading?: boolean
        isSuccess?: boolean
        defaultValue?: string
    }>
    propertiesComponent: React.FC<{
        fieldInstance: FormFieldInstance
    }>
    validate: (formField: FormFieldInstance, currentValue: string) => boolean
}

export type FormFieldInstance = {
    _id: string
    type: FieldsType
    extraAttributes?: Record<string, any>
}

type FormFieldsType = {
    [key in FieldsType]: FormField
}


export const FormElements: FormFieldsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldForm,
    SubtitleField: SubtitleFieldForm,
    ParagraphField: ParagraphFieldForm,
    NumberField: NumberFieldForm,
    TextAreaField: TextareaForm,
    DateField: DateFieldForm,
    SelectField: SelectFieldForm,
    CheckboxField: CheckboxForm
}