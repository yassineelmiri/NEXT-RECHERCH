'use client';

import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Avatar et Informations */}
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {user.username}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} - {user.status}
            </p>
          </div>
        </div>

        <div className="mt-8">
          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Réputation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user.reputation}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                ID utilisateur
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user._id}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Statut
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user.status}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Date d'inscription
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{new Date(user.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Bouton de déconnexion */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload(); 
            }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
