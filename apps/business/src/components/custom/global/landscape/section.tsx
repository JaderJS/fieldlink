'use client'

import { motion } from "framer-motion"
import { SubHeader } from "./sub.header"
import { ElementType } from "react";
import { cn } from "@/src/lib/utils";

export function Section({ icon: Icon, title, text, className }: { icon?: ElementType, title: string, text: string | string[], className?: string }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn("px-6 mt-20 max-w-5xl mx-auto text-center", className)}
        >
            <SubHeader icon={Icon} title={title} />
            {Array.isArray(text) ? text.map((paragraph, index) => (
                <p key={index} className="mt-4 text-muted-foreground leading-relaxed text-justify">{paragraph}</p>
            )) : (
                <p className="mt-4 text-muted-foreground leading-relaxed text-justify">{text}</p>
            )}
        </motion.section>
    )
}