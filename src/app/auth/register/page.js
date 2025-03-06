"use client";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function Register() {

    const router = useRouter();
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "", 
        confirmPassword: "", 
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value.trim(),
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault(); 

        if(state.username){
            alert('entre le nom !!');
            return;
        }

        if (state.password !== state.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const res = await fetch(`http://localhost:4000/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                username: state.username,
                email: state.email,
                password: state.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            alert('Utilisateur enregistré avec succès');
            router.push('/auth/login');
        } else {
            alert('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    }

    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
                <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
                        Inscription
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Nom complet */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={state.username}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Entrer votre nom complet"
                            />
                        </div>
                        {/* Email */}
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
                        {/* Mot de passe */}
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
                                placeholder="Créer un mot de passe"
                            />
                        </div>
                        {/* Confirmer le mot de passe */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirmez le Mot de Passe
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={state.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Confirmer le mot de passe"
                            />
                        </div>
                        {/* Bouton soumettre */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                        >
                            S'inscrire
                        </button>
                    </form>
                    {/* Lien supplémentaire */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Vous avez déjà un compte ?{" "}
                            <a
                                href="/auth/login"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Connectez-vous
                            </a>
                        </p>
                    </div>
                </div>
            </div>
    );
}
