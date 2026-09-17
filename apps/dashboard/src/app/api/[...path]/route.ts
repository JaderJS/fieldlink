import { NextRequest, NextResponse } from "next/server";

async function proxy(
  req: NextRequest,
  params: Promise<{ path: string[] }>
) {
  const { path } = await params;

  const base = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
  const query = req.nextUrl.search || "";
  const url = `${base}/${path.join("/")}${query}`;

  /**
   * Lê o body de forma segura:
   * - JSON / texto → text()
   * - multipart / binário → arrayBuffer()
   */
  let body: BodyInit | undefined = undefined;

  if (req.method !== "GET" && req.method !== "HEAD") {
    const contentType = req.headers.get("content-type") ?? "";

    if (
      contentType.includes("application/json") ||
      contentType.startsWith("text/")
    ) {
      body = await req.text();
    } else {
      body = await req.arrayBuffer();
    }
  }

  const headers: Record<string, string> = {
    cookie: req.headers.get("cookie") ?? "",
    authorization: req.headers.get("authorization") ?? "",
    origin: req.headers.get("origin") ?? "",
  }

  const reqContentType = req.headers.get("content-type");
  if (body !== undefined && reqContentType) {
    headers["content-type"] = reqContentType;
  }

  const backendRes = await fetch(url, {
    method: req.method,
    headers: headers,
    // headers: {
    //   cookie: req.headers.get("cookie") ?? "",
    //   authorization: req.headers.get("authorization") ?? "",
    //   // IMPORTANTE: repassa o content-type original
    //   "content-type": req.headers.get("content-type") ?? "",
    // },
    body,
  });

  const res = new NextResponse(backendRes.body, {
    status: backendRes.status,
  });

  /**
   * Headers essenciais da resposta
   */
  const contentType = backendRes.headers.get("content-type");
  if (contentType) {
    res.headers.set("content-type", contentType);
  }

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.append("set-cookie", setCookie);
  }

  return res;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, ctx.params);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  return proxy(req, ctx.params);
}
