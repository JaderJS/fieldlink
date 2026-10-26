import Elysia from "elysia";

const requestStart = new WeakMap<Request, number>();
export const logger = new Elysia()
	.onRequest(({ request }) => {
		requestStart.set(request, performance.now());
	})
	.onAfterHandle(({ request, set }) => {
		const start = requestStart.get(request);

		if (start === undefined) return;

		const duration = performance.now() - start;
		const url = new URL(request.url);

		console.log(
			`${request.method} ${url.pathname} → ${set.status} (${duration.toFixed(2)}ms)`,
		);
	});
