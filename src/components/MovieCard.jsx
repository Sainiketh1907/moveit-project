import React from 'react'

const MovieCard = ({ movie, onClick, onBookmark, isBookmarked }) => {
  const { poster_url, title, vote_average, release_date, original_language } = movie
  const validPoster = poster_url && poster_url !== 'N/A'

  const handleBookmarkClick = (e) => {
    e.stopPropagation() // Prevent card click when clicking bookmark
    onBookmark(movie)
  }

  // Add console.log to debug
  console.log('isBookmarked:', isBookmarked)

  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="movie-card-header">
        {/* Bookmark counter at top-left */}
        <div className="bookmark-store">
          <img src="/bookmarkStore.png" alt="Bookmark Store" />
          {isBookmarked && <span className="bookmark-count">1</span>}
        </div>
        {/* Movie poster */}
        {validPoster ? (
          <img src={poster_url} alt={title} className="movie-poster" />
        ) : (
          <img src="/placeholder.png" alt="No poster available" className="movie-poster" />
        )}
      </div>
      <div className="movie-card-content">
        <h3>{title || 'No Title'}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language || 'N/A'}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
        {/* Bookmark toggle button */}
        <button 
          className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <img 
            src={isBookmarked ? "/bookmark2.png" : "/bookmark1.png"} 
            alt="Bookmark"
          />
        </button>
      </div>
    </div>
  )
}

export default MovieCard