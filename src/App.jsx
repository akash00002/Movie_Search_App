import FavoritesList from "./components/FavoritesList";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import { useMovies } from "./components/MovieContext";

export default function App() {
  const { searchResults, loading, error, handleSearch, toggleFavorites, favorites } = useMovies();

  return (
    <div className="min-h-screen bg-gray-200 p-4 font-sans">

      <header className="flex items-center justify-between bg-gray-50 py-6 px-10 rounded-t-2xl shadow-lg mt-2 mx-6">
        <h1 className="text-3xl font-bold text-gray-800">
          MovieFinder
        </h1>
        <div>
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>

      <main className="flex">
        <div className="w-2/3">
          <SearchResults
            results={searchResults}
            loading={loading}
            error={error}
            onAddToFavorites={toggleFavorites}
            favorites={favorites}
          />
        </div>

        <div className="self-center h-5/6 w-px bg-gray-300"></div>

        <div className="w-1/3">
          <FavoritesList favorites={favorites} onAddToFavorites={toggleFavorites} />
        </div>
      </main>

    </div>
  )
}