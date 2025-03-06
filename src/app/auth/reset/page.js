export default function Reset() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Send Email
          </h1>
          <form className="space-y-6">
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
                required
                className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Entrer votre email"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
              Reset Password
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
          </div>
        </div>
      </div>
    );
  }
  