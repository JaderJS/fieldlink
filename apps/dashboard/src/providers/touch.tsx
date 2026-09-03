'use client'

import { createContext, useContext, useEffect, useState } from "react"

interface TouchProps {
    isTouched: boolean,
    unlocked: boolean,
}

const TouchContext = createContext<TouchProps>({ isTouched: false, unlocked: false })

const TouchProvider = ({ children }: { children: React.ReactNode }) => {

    const [doubleClicked, setDoubleClicked] = useState(false)

    useEffect(() => {
        const handleDoubleClick = () => {
            setDoubleClicked(true)
        }

        window.addEventListener("dblclick", handleDoubleClick)

        return () => {
            window.removeEventListener("dblclick", handleDoubleClick)
        }
    }, [])

    return (
        <TouchContext.Provider value={{ isTouched: doubleClicked, unlocked: !doubleClicked }}>
            {children}
        </TouchContext.Provider>
    )
}

const useTouch = () => {
    const context = useContext(TouchContext)
    return context
}

export { TouchProvider, useTouch }