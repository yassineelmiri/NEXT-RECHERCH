"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from 'next-auth/react';

export default function Login() {
    const router = useRouter();
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:4000/auth/login`, {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const json = await res.json();
            localStorage.setItem("token", json.token); 
            localStorage.setItem("user", JSON.stringify(json.user)); 

            const user = JSON.parse(localStorage.getItem("user"));

            if (user.role === "admin") {
                router.push("/statistique");
            } else {
                router.push("/"); 
            }
        } else {
            alert("Identifiants incorrects. Veuillez réessayer.");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
                    Connexion
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Adresse Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Entrer votre email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Mot de Passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={state.password}
                            onChange={handleChange} 
                            required
                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Entrer votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                    >
                        Se connecter
                    </button>
                </form>
                {/* Additional Links */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Vous n'avez pas de compte ?{" "}
                        <a
                            href="/auth/register"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Inscrivez-vous
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                        <a
                            href="/auth/reset"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Mot de passe oublié ?
                        </a>
                    </p>
                    <button
                        type="button" onClick={() => signIn('google')}
                        className="mt-5 bg-gray-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                    >
                        Sing In with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
