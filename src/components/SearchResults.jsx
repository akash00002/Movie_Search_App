import { Heart } from "lucide-react";

const SearchResults = ({ results, loading, error, onAddToFavorites, favorites }) => {
    const paraClasses = "text-gray-500 text-center";

    const renderContent = () => {
        if (loading) {
            return <p className={paraClasses}>Loading...</p>;
        }

        if (error) {
            return <p className={paraClasses}>{error}</p>;
        }

        if (results && results.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.map((movie) => {
                        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

                        return (
                            <div key={movie.imdbID} className="bg-white rounded shadow p-2 relative">
                                <button
                                    onClick={() => onAddToFavorites(movie)}
                                    className={`absolute top-3 right-3 p-1.5 z-10 rounded-full cursor-pointer ${isFavorite ? "bg-red-100" : "bg-gray-100 hover:bg-red-200"
                                        } transition`}
                                >
                                    <Heart
                                        size={22}
                                        className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}
                                    />
                                </button>

                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} Poster`}
                                    className="w-full h-auto rounded"
                                />

                                <h3 className="font-bold mt-2">{movie.Title}</h3>
                                <p className="text-sm text-gray-600">{movie.Year}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return <p className={paraClasses}>Search for a movie to see results.</p>;
    };

    return (
        <section className="bg-white py-6 px-10 ml-6 rounded-bl-2xl shadow-md h-[calc(82vh)] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Results</h2>
            {renderContent()}
        </section>
    );
};

export default SearchResults;
