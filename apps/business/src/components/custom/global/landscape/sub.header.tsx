import { ElementType } from "react";

export function SubHeader({ icon: Icon, title }: { icon?: ElementType, title: string }) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            {!!Icon && <div className="bg-secondary/10 p-3 rounded-full">
                <Icon className="text-secondary size-6" />
            </div>}
            <h2 className="text-2xl md:text-3xl font-semibold antialiased">
                {title}
            </h2>
        </div>
    )
}