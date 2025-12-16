import { Heart } from "lucide-react";

const FavoritesList = ({ favorites, onAddToFavorites }) => {
    return (
        <section className="bg-white py-6 px-10 mr-6 rounded-br-2xl shadow-md h-[calc(82vh)] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">My Favorites</h2>

            {favorites.length === 0 ? (
                <p className="text-gray-500 text-center">Your favorite movies will appear here.</p>
            ) : (
                <ul className="space-y-3">

                    {favorites.map(movie => {
                        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
                        return (
                            <li key={movie.imdbID} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">


                                <button
                                    onClick={() => onAddToFavorites(movie)}
                                    className={`absolute top-2/ right-25 p-1.5 z-10 rounded-full cursor-pointer hover:bg-white ${isFavorite ? "bg-red-100" : "bg-gray-100"
                                        } transition`}
                                >
                                    <Heart
                                        size={22}
                                        className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}
                                    />
                                </button>
                                <img src={movie.Poster} alt={movie.Title} className="w-10 h-14 rounded object-cover" />
                                <div>
                                    <h4 className="font-semibold">{movie.Title}</h4>
                                    <p className="text-xs text-gray-500">{movie.Year}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

        </section>
    )
}

export default FavoritesList;