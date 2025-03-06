"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function OfferDetails() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [candidature, setCandidature] = useState({
    status: "En cours",
    notes: 0,
    cv: "",
    Offers: [],
    Users: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    async function fetchOfferDetails() {
      try {
        const response = await fetch(`http://localhost:4000/offer/${offerId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails de l'offre");
        }
        const data = await response.json();
        setOffer(data);

        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);

          setCandidature((prev) => ({
            ...prev,
            Offers: [data._id],
            Users: parsedUser._id,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOfferDetails();
  }, [offerId]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur inconnue");
      }

      alert("Candidature soumise avec succès !");
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return <p>Chargement des détails de l'offre...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <header className="bg-blue-600 text-white py-4 px-6 mb-6 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Détails de l'offre</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
        >Retour</button>
      </header>
      <main className="flex-grow">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{offer?.title || "Titre non disponible"}</h2>
          <p className="text-gray-600 dark:text-gray-400">Entreprise : {offer?.company || "Non spécifiée"}</p>
          <p className="text-gray-600 dark:text-gray-400">Lieu : {offer?.location || "Non spécifié"}</p>
          <p className="text-gray-600 dark:text-gray-400">Salaire : {offer?.salary || "Non spécifié"}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">{offer?.description || "Description non disponible"}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Postuler à cette offre</h3>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (facultatif)
            </label>
            <input
              type="number"
              id="notes"
              value={candidature.notes}
              onChange={(e) => setCandidature({ ...candidature, notes: parseInt(e.target.value, 10) || 0 })}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg"
              placeholder="Ajouter une note (0-100)"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Lien vers votre CV
            </label>
            <input
              type="url"
              id="cv"
              value={candidature.cv}
              onChange={(e) => setCandidature({ ...candidature, cv: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg"
              placeholder="https://exemple.com/cv.pdf"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Soumettre ma candidature
          </button>
        </form>
      </main>
    </div>
  );
}
