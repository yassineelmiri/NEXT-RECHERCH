"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CandidatureList() {
    const router = useRouter();
    const [candidatures, setCandidatures] = useState([]);
    const [selectedCandidature, setSelectedCandidature] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedCandidature, setUpdatedCandidature] = useState({
        status: "",
        notes: "",
        cv: "",
        Offers: [],
        Users: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth/login");
        } else {
            fetchCandidatures();
        }
    }, [router]);

    const fetchCandidatures = async () => {
        const res = await fetch("http://localhost:4000/candidature");
        const data = await res.json();
        setCandidatures(data);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/candidature/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            fetchCandidatures();
        } else {
            alert("Erreur lors de la suppression de la candidature.");
        }
    };

    const handleEdit = (candidature) => {
        setSelectedCandidature(candidature);
        setUpdatedCandidature({
            status: candidature.status,
            notes: candidature.notes,
            cv: candidature.cv,
            Offers: candidature.Offers,
            Users: candidature.Users,
        });
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:4000/candidature/${selectedCandidature._id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedCandidature),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            fetchCandidatures(); 
            setShowModal(false);
        } else {
            alert("Erreur lors de la mise à jour de la candidature.");
        }
    };

    const handleChangeStatus = async (id, newStatus) => {
        const updated = { status: newStatus };
        const res = await fetch(`http://localhost:4000/candidature/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updated),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            fetchCandidatures(); 
        } else {
            alert("Erreur lors de la mise à jour du statut.");
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Liste des Candidatures</h1>

                    {/* Candidature Table */}
                    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Statut</th>
                                    <th className="px-4 py-2 text-left">Notes</th>
                                    <th className="px-4 py-2 text-left">CV</th>
                                    <th className="px-4 py-2 text-left">Offres</th>
                                    <th className="px-4 py-2 text-left">Utilisateurs</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidatures.map((candidature) => (
                                    <tr key={candidature._id}>
                                        <td className="px-4 py-2">{candidature.status}</td>
                                        <td className="px-4 py-2">{candidature.notes}</td>
                                        <td className="px-4 py-2">
                                            <a href={candidature.cv} target="_blank" className="text-blue-600">Voir CV</a>
                                        </td>
                                        <td className="px-4 py-2">{candidature.Offers.join(", ")}</td>
                                        <td className="px-4 py-2">{candidature.Users}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(candidature)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(candidature._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                                            >
                                                Supprimer
                                            </button>
                                            <button
                                                onClick={() => handleChangeStatus(candidature._id, 'Valider')}
                                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                                            >
                                                Valider
                                            </button>
                                            <button
                                                onClick={() => handleChangeStatus(candidature._id, 'Refuser')}
                                                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                                            >
                                                Refuser
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for editing a candidature */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/3">
                                <h2 className="text-xl font-semibold mb-4">Modifier la Candidature</h2>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="status">
                                            Statut
                                        </label>
                                        <input
                                            type="text"
                                            id="status"
                                            value={updatedCandidature.status}
                                            onChange={(e) => setUpdatedCandidature({ ...updatedCandidature, status: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="notes">
                                            Notes
                                        </label>
                                        <input
                                            type="number"
                                            id="notes"
                                            value={updatedCandidature.notes}
                                            onChange={(e) => setUpdatedCandidature({ ...updatedCandidature, notes: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="cv">
                                            CV
                                        </label>
                                        <input
                                            type="url"
                                            id="cv"
                                            value={updatedCandidature.cv}
                                            onChange={(e) => setUpdatedCandidature({ ...updatedCandidature, cv: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="Offers">
                                            Offres
                                        </label>
                                        <input
                                            type="text"
                                            id="Offers"
                                            value={updatedCandidature.Offers.join(", ")}
                                            onChange={(e) =>
                                                setUpdatedCandidature({
                                                    ...updatedCandidature,
                                                    Offers: e.target.value.split(","),
                                                })
                                            }
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="Users">
                                            Utilisateurs
                                        </label>
                                        <input
                                            type="text"
                                            id="Users"
                                            value={updatedCandidature.Users}
                                            onChange={(e) =>
                                                setUpdatedCandidature({
                                                    ...updatedCandidature,
                                                    Users: e.target.value,
                                                })
                                            }
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                                        >
                                            Annuler
                                        </button>
                                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                            Sauvegarder
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
