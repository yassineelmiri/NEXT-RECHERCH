"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import UserPage from "./user/page";

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const getUserData = () => {
    const localUser = localStorage.getItem("user");
    const googleUser = Cookies.get("user");

    if (localUser) {
      return JSON.parse(localUser);
    }

    if (googleUser) {
      return JSON.parse(googleUser);
    }

    return null;
  };

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch("http://localhost:4000/offer");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des offres");
        }
        const data = await response.json();
        setOffers(data);
        setFilteredOffers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();

    const userData = getUserData();
    if (userData) {
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = offers.filter((offer) => {
      const title = offer.title ? offer.title.toLowerCase() : "";
      const company = offer.company ? offer.company.toLowerCase() : "";
      const location = offer.location ? offer.location.toLowerCase() : "";

      return (
        title.includes(query) ||
        company.includes(query) ||
        location.includes(query)
      );
    });

    setFilteredOffers(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold font-sans">Edicom</h1>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProfile(true)}
                className="bg-white text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-transform transform hover:scale-105"
              >
                Mon Profil
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-transform transform hover:scale-105"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-white text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-transform transform hover:scale-105"
            >
              Se connecter
            </Link>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Rechercher</h2>
          <p className="text-gray-600">Consommation de l'API.</p>
        </div>
        {/* Barre de recherche */}
        <div className="mb-8 flex justify-center items-center gap-4 mt-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 pl-12 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <button className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
        {/* Boutons de filtrage */}
        <div className="px-6 py-4 shadow-md bg-yellow-50 rounded-lg">
          <div className="flex flex-wrap gap-4 justify-center">
            {["Ville", "Nationale", "Téléphone", "Marque", "ICE"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Recherche par {filter}
              </button>
            ))}
          </div>
        </div>



        {/* Résultats */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img
                  src="/emploi.jpg"
                  alt="Offre d'emploi"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mt-2">Entreprise: {offer.company}</p>
                <p className="text-gray-600">Lieu: {offer.location}</p>
                <p className="text-gray-600">
                  Date de Création: {offer.createdAt || "Non Date"}
                </p>
                <button
                  className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition-transform transform hover:scale-105"
                  onClick={() => router.push(`/offer/${offer._id}`)}
                >
                  Voir les détails
                </button>
              </div>
            ))}
        </div>
      </main>

      {/* Section "About Us" */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            À propos de nous
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 text-gray-600">
              <p className="mb-4">
                Nous sommes une plateforme innovante dédiée à la recherche d'offres
                d'emploi et de services professionnels. Notre mission est de simplifier
                la recherche d'opportunités pour les candidats et les entreprises.
              </p>
              <p>
                Avec une interface intuitive et des outils puissants, nous vous aidons
                à trouver ce que vous cherchez rapidement et efficacement.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src="/emploi.jpg"
                alt="À propos de nous"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-500 text-white py-8 mt-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos de nous</h3>
              <p className="text-yellow-100">
                Nous sommes une plateforme dédiée à la recherche d'offres d'emploi
                et de services professionnels.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <ul className="text-yellow-100 space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-200 transition">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-200 transition">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-200 transition">
                    Contactez-nous
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-yellow-100 hover:text-yellow-200 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-yellow-100 hover:text-yellow-200 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}