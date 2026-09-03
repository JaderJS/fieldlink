// components/ActionItem.tsx
'use client'

import React, { forwardRef } from 'react'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

type ActionItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuItem>

export const ActionItem = forwardRef<HTMLDivElement, ActionItemProps>(function ActionItem(props, ref) {
    return <DropdownMenuItem ref={ref} {...props} />
})

ActionItem.displayName = 'ActionItem'
