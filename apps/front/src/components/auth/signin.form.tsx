import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { authClient } from "@/lib/auth";

export function SignInForm() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError(null);
		setLoading(true);

		const result = await authClient.signIn.email({
			email,
			password,
		});

		setLoading(false);

		if (result.error) {
			setError(result.error.message ?? "Falha ao entrar");
			return;
		}

		await navigate({
			to: "/dashboard",
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Entrar</h1>

			<input
				type="email"
				placeholder="E-mail"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
				required
			/>

			<input
				type="password"
				placeholder="Senha"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				required
			/>

			{error && <p>{error}</p>}

			<button type="submit" disabled={loading}>
				{loading ? "Entrando..." : "Entrar"}
			</button>

			<Link to="/sign-up">Criar conta</Link>
		</form>
	);
}
