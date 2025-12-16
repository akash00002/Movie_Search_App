import { useState } from "react"

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query.trim()) {
            onSearch(query.trim());
        }
    }
    return (
        <>
            <form className="flex gap-3 w-full" onSubmit={handleSubmit}>
                <input
                    placeholder="Search for a movie title..."
                    type="text"
                    className="px-6 py-2 text-gray-800 font-medium bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    className="px-3 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    Search</button>
            </form>
        </>
    )
}

export default SearchInput;