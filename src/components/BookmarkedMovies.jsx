import React from 'react'
import MovieCard from './MovieCard'

const BookmarkedMovies = ({ bookmarks, onMovieClick, onBookmark }) => {
  if (!bookmarks.length) {
    return (
      <section className="bookmarked-movies">
        <h2>Your Bookmarks</h2>
        <p className="no-bookmarks">No bookmarked movies yet</p>
      </section>
    )
  }

  return (
    <section className="bookmarked-movies">
      <h2>Your Bookmarks</h2>
      <ul>
        {bookmarks.map(movie => (
          <li key={movie.id} onClick={() => onMovieClick(movie.id)}>
            <MovieCard 
              movie={movie} 
              onBookmark={onBookmark}
              isBookmarked={true}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BookmarkedMovies