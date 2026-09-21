import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="text-center">
				<h1 className="text-6xl font-bold">404</h1>

				<p className="mt-4 text-muted-foreground">
					A página que você procura não existe.
				</p>

				<Link
					to="/"
					className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground"
				>
					Voltar para o início
				</Link>
			</div>
		</div>
	);
}
