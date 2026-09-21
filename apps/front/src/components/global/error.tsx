import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function GlobalError({ error, reset }: ErrorComponentProps) {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md text-center">
				<h1 className="text-2xl font-semibold">Algo deu errado</h1>

				<p className="mt-2 text-muted-foreground">
					Ocorreu um erro inesperado. Tente novamente.
				</p>

				{import.meta.env.DEV && (
					<pre className="mt-4 overflow-auto rounded-md bg-muted p-4 text-left text-xs">
						<p>{error instanceof Error ? error.message : String(error)}</p>
						<p>
							{error instanceof Error && Object.entries(error).length > 0
								? JSON.stringify(error, null, 2)
								: String(error)}
						</p>
					</pre>
				)}

				<Button
					type="button"
					onClick={reset}
					className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
				>
					Tentar novamente
				</Button>
			</div>
		</div>
	);
}
