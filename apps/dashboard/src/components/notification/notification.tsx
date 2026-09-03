import { cn } from "@/lib/utils"
import { ElementType, forwardRef, HTMLAttributes } from "react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { formatDistanceToNow, isPast } from "date-fns"
import { ptBR } from "date-fns/locale"


const Notification = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => (

    <div ref={ref} className="w-full flex flex-col items-start py-2 border-b">
        {children}
    </div>
))
Notification.displayName = "Notification"

interface NotificationDateProps extends HTMLAttributes<HTMLDivElement> {
    date: any
}

const NotificationDate = forwardRef<HTMLDivElement, NotificationDateProps>(({ children, date, ...props }, ref) => {

    const isPassed = isPast(date)

    return (

        <div ref={ref} className="flex-1 flex mx-auto self-center">
            <p className={cn("text-muted-foreground text-xs", isPassed && "text-red-500")}>{formatDistanceToNow(date, { locale: ptBR })}</p>
        </div>
    )
})
NotificationDate.displayName = "NotificationDate"

const NotificationContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => (
    <div ref={ref} className="w-full flex justify-between items-center gap-x-3">
        {children}
    </div>
))

NotificationContent.displayName = "NotificationContent"

const NotificationActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex gap-1", className)}
        {...props}
    >
        {children}
    </div>
))
NotificationActions.displayName = "NotificationActions"

interface ActionProps extends HTMLAttributes<HTMLButtonElement> {
    icon: ElementType
}

const Action = forwardRef<HTMLButtonElement, ActionProps>(({ className, icon: Icon, ...props }, ref) => (
    <Button
        ref={ref}
        variant="ghost"
        className={cn("w-8 h-8 rounded flex items-center justify-center mx-auto self-end", className)}
        {...props}
    >
        <Icon className="w-3 h-3" />
    </Button>
))
NotificationActions.displayName = "Action"

const NotificationIcon = ({ icon: Icon }: { icon: ElementType }) => {
    return (
        <Icon className="w-18 h-18" />
    )
}

export {
    Notification,
    NotificationDate,
    NotificationContent,
    NotificationActions,
    Action,
    NotificationIcon
}