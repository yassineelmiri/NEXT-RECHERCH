"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OfferList() {
    const router = useRouter();
    const [offers, setOffers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newOffer, setNewOffer] = useState({
        title: "",
        ContactType: "",
        location: "",
        description: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/auth/login");
        } else {
            fetchOffers();
        }
    }, [router]);

    const fetchOffers = async () => {
        const res = await fetch("http://localhost:4000/offer");
        const data = await res.json();
        setOffers(data);
    };

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/offer/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            fetchOffers(); 
        } else {
            alert("Erreur lors de la suppression de l'offre.");
        }
    };

    const handleAddOffer = () => {
        setShowModal(true);
        setNewOffer({
            title: "",
            ContactType: "",
            location: "",
            description: "",
        });
    };

    const handleAddNewOffer = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/offer", {
            method: "POST",
            body: JSON.stringify(newOffer),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            fetchOffers();
            setShowModal(false); 
        } else {
            alert("Erreur lors de l'ajout de l'offre.");
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
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Liste des Offres</h1>
                        <button
                            onClick={handleAddOffer}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                        >
                            Ajouter une Offre
                        </button>
                    </div>

                    {/* Offer Table */}
                    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Titre</th>
                                    <th className="px-4 py-2 text-left">Type de Contact</th>
                                    <th className="px-4 py-2 text-left">Lieu</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.map((offer) => (
                                    <tr key={offer._id}>
                                        <td className="px-4 py-2">{offer.title}</td>
                                        <td className="px-4 py-2">{offer.ContactType}</td>
                                        <td className="px-4 py-2">{offer.location}</td>
                                        <td className="px-4 py-2">{offer.description}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(offer)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(offer._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for adding a new offer */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/3">
                                <h2 className="text-xl font-semibold mb-4">Ajouter une Offre</h2>
                                <form onSubmit={handleAddNewOffer}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
                                            Titre
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={newOffer.title}
                                            onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="ContactType">
                                            Type de Contact
                                        </label>
                                        <input
                                            type="text"
                                            id="ContactType"
                                            value={newOffer.ContactType}
                                            onChange={(e) => setNewOffer({ ...newOffer, ContactType: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="location">
                                            Lieu
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={newOffer.location}
                                            onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })}
                                            className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={newOffer.description}
                                            onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
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
                                            Ajouter
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
