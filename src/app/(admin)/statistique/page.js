"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminStatistique() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-blue-600 dark:bg-blue-800 text-white h-[100vh] p-6">
                    <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
                    <ul>
                        <li>
                            <a href="/statistique" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Statistiques</a>
                        </li>
                        <li>
                            <a href="/offer" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Liste des Offres</a>
                        </li>
                        <li>
                            <a href="/candidature" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Liste des Candidatures</a>
                        </li>
                        <li>
                            <a href="/candidature" className="block py-2 px-4 rounded-lg hover:bg-blue-700">Profile</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-grow p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Page des Statistiques Administratives</h1>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Vue d'ensemble</h2>
                        <p className="text-gray-600 dark:text-gray-400">Affichage des statistiques détaillées ici...</p>
                    </div>
                    {/* Example of a card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Statistique 1</h3>
                            <p className="text-gray-600 dark:text-gray-400">Contenu de la statistique 1...</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Statistique 2</h3>
                            <p className="text-gray-600 dark:text-gray-400">Contenu de la statistique 2...</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Statistique 3</h3>
                            <p className="text-gray-600 dark:text-gray-400">Contenu de la statistique 3...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
