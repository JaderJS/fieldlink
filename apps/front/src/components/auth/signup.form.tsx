import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { authClient } from "@/lib/auth";

export function SignUpForm() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setError(null);
		setLoading(true);

		const result = await authClient.signUp.email({
			name,
			email,
			password,
		});

		setLoading(false);

		if (result.error) {
			setError(result.error.message ?? "Falha ao criar a conta");

			return;
		}

		await navigate({
			to: "/dashboard",
		});
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col">
			<h1>Criar conta</h1>

			<input
				type="text"
				placeholder="Nome"
				value={name}
				onChange={(event) => setName(event.target.value)}
				required
			/>

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
				{loading ? "Criando..." : "Criar conta"}
			</button>

			<Link to="/sign-in">Já tenho uma conta</Link>
		</form>
	);
}
