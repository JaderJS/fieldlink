import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { GoogleIcon } from "../icons/google";
import { Button } from "../ui/button";

export function SignInForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (typeof email !== "string" || typeof password !== "string") {
			return;
		}

		setError(null);
		setLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			const email = formData.get("email");
			const password = formData.get("password");

			if (typeof email !== "string" || typeof password !== "string") {
				setError("Email e senha são obrigatórios.");
				return;
			}

			const result = await authClient.signIn.email({
				email,
				password,
			});

			if (result.error) {
				setError(result.error.message ?? "Email ou senha inválidos.");
				return;
			}

			await navigate({
				to: "/dashboard",
			});
		} catch {
			setError("Não foi possível entrar. Tente novamente.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
					<CardDescription>Login com sua conta Google</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<Button variant="outline" type="button" disabled={loading}>
									<GoogleIcon />
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Ou continue com
							</FieldSeparator>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									disabled={loading}
									placeholder="fieldlink@example.com"
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Senha</FieldLabel>
									<Link
										to="/sign-in"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										Esqueceu sua senha?
									</Link>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									disabled={loading}
									placeholder="*********"
									required
								/>
							</Field>

							{error && (
								<FieldDescription className="text-center text-destructive">
									{error}
								</FieldDescription>
							)}

							<Field>
								<Button type="submit" disabled={loading}>
									{loading ? "Entrando..." : "Login"}
								</Button>

								<FieldDescription className="text-center">
									Ainda não tem conta? <Link to="/sign-up">Inscreva-se</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
