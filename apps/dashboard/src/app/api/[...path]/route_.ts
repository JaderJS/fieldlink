// src/app/api/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server"

async function proxy(
    req: NextRequest,
    params: Promise<{ path: string[] }>
) {
    const { path } = await params

    const base = (process.env.BACKEND_URL ?? "").replace(/\/$/, "")
    const query = req.nextUrl.search || ""
    const url = `${base}/${path.join("/")}${query}`

    const backendRes = await fetch(url, {
        method: req.method,
        headers: {
            cookie: req.headers.get("cookie") ?? "",
            authorization: req.headers.get("authorization") ?? "",
            "content-type": req.headers.get("content-type") ?? "",
        },
        body: req.method !== "GET" ? await req.text() : undefined,
    })

    const res = new NextResponse(backendRes.body, {
        status: backendRes.status,
    })

    const contentType = backendRes.headers.get("content-type")
    if (contentType) {
        res.headers.set("content-type", contentType)
    }

    const setCookie = backendRes.headers.get("set-cookie")
    if (setCookie) {
        res.headers.append("set-cookie", setCookie)
    }

    return res

    //     const hasBody = !["GET", "HEAD"].includes(req.method)

    //     const headers = new Headers()

    //     req.headers.forEach((value, key) => {
    //         // não repassa headers que quebram o fetch
    //         if (!["host", "content-length"].includes(key)) {
    //             headers.set(key, value)
    //         }
    //     })

    //    const backendRes = await fetch(url, {
    //     method: req.method,
    //     headers,
    //     ...(hasBody
    //       ? {
    //           body: req.body,
    //           duplex: "half",
    //         }
    //       : {}),
    //   })

    //     const res = new NextResponse(backendRes.body, {
    //         status: backendRes.status,
    //     })

    //     backendRes.headers.forEach((value, key) => {
    //         if (key.toLowerCase() === "set-cookie") {
    //             res.headers.append("set-cookie", value)
    //         } else {
    //             res.headers.set(key, value)
    //         }
    //     })

    //     return res
}

export async function GET(
    req: NextRequest,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxy(req, ctx.params)
}

export async function POST(
    req: NextRequest,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxy(req, ctx.params)
}

export async function DELETE(
    req: NextRequest,
    ctx: { params: Promise<{ path: string[] }> }
) {
    return proxy(req, ctx.params)
}
