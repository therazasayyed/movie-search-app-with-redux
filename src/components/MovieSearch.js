import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/movieReducer';
import './MovieSearch.css';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { results, loading, error, page, totalPages } = useSelector((state) => state.movies);

    useEffect(() => {
        // If user hasn't typed anything, load default movies
        if (query.trim() === '') {
            dispatch(fetchMovies({ query: 'Avengers', page: 1 }));
        } else {
            dispatch(fetchMovies({ query, page: 1 }));
        }
    }, [query, dispatch]);

    const handlePageChange = (newPage) => {
        if (!query.trim()) return; // prevent fetching without a valid query
        dispatch(fetchMovies({ query, page: newPage }));
    };

    return (
        <div className="movie-search">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {loading && <div className="spinner">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}

            <div className="movie-list">
                {results.map((movie) => (
                    <div className="movie-card" key={movie.imdbID}>
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
                            alt={movie.Title}
                        />
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={page === pageNumber ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={!query.trim()}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;