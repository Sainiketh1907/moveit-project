import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import './index.css'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import BookmarkedMovies from './components/BookmarkedMovies'

const OMDB_API_URL = 'https://www.omdbapi.com'
const OMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: { accept: 'application/json' }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks')
    return saved ? JSON.parse(saved) : []
  })
  const [showBookmarks, setShowBookmarks] = useState(false)

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const { logout, user } = useAuth0()

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  // Fetch movies from OMDB based on the search term
  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      if (!query) {
        setMovieList([])
        setIsLoading(false)
        return
      }
      const endpoint = `${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error('Failed to fetch movies from OMDB')
      }
      const data = await response.json()
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'No movies found')
        setMovieList([])
        setIsLoading(false)
        return
      }
      const movies = data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        poster_url: movie.Poster,
        vote_average: null,
        release_date: movie.Year,
        original_language: 'N/A'
      }))
      setMovieList(movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  // Fetch detailed movie info from OMDB
  const fetchMovieDetails = async (movieId) => {
    try {
      const endpoint = `${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&i=${movieId}&plot=full`
      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error('Failed to fetch movie details from OMDB')
      }
      const data = await response.json()
      if (data.Response === 'False') throw new Error(data.Error)
      return data
    } catch (error) {
      console.error('Error fetching movie details:', error)
      return null
    }
  }

  const handleMovieClick = async (movieId) => {
    const details = await fetchMovieDetails(movieId)
    if (details) {
      const mappedDetails = {
        id: details.imdbID,
        title: details.Title,
        poster_url: details.Poster,
        vote_average: parseFloat(details.imdbRating),
        release_date: details.Released,
        original_language: details.Language
      }
      setSelectedMovie(mappedDetails)
    }
  }

  const handleBookmark = (movie) => {
    setBookmarks(prev => {
      // Add console.log to debug
      console.log('Current bookmarks:', prev)
      console.log('Toggling movie:', movie)
      
      const isBookmarked = prev.some(b => b.id === movie.id)
      if (isBookmarked) {
        return prev.filter(b => b.id !== movie.id)
      } else {
        return [...prev, movie]
      }
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    window.location.reload()
  }

  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      redirectUri={window.location.origin}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <main>
                  <div className="pattern" />
                  <div className="wrapper">
                    <header>
                      <div className="user-menu">
                        <button 
                          className="bookmarks-toggle"
                          onClick={() => setShowBookmarks(!showBookmarks)}
                        >
                          <img src="/bookmarkStore.png" alt="Bookmarks" />
                          <span>{bookmarks.length}</span>
                        </button>
                        <span className="user-email">
                          {localStorage.getItem('userEmail')}
                        </span>
                        <button 
                          onClick={handleLogout}
                          className="logout-button"
                        >
                          Logout
                        </button>
                      </div>
                      {showBookmarks ? (
                        <button 
                          className="back-button"
                          onClick={() => setShowBookmarks(false)}
                        >
                          <img src="/backbtn.png" alt="Back" />
                        </button>
                      ) : (
                        <>
                          <img src="/hero.png" alt="Hero Banner" />
                          <h1>
                            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
                          </h1>
                          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        </>
                      )}
                    </header>

                    {showBookmarks ? (
                      <BookmarkedMovies 
                        bookmarks={bookmarks}
                        onMovieClick={handleMovieClick}
                        onBookmark={handleBookmark}
                      />
                    ) : (
                      <section className="all-movies">
                        <h2>All Movies</h2>
                        {isLoading ? (
                          <Spinner />
                        ) : errorMessage ? (
                          <p className="error">{errorMessage}</p>
                        ) : (
                          <ul>
                            {movieList.map(movie => (
                              <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                                <MovieCard 
                                  movie={movie} 
                                  onBookmark={handleBookmark}
                                  isBookmarked={bookmarks.some(b => b.id === movie.id)}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    )}

                    {selectedMovie && (
                      <section className="movie-details">
                        <h2>{selectedMovie.title}</h2>
                        <p>
                          Rating:{' '}
                          {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : 'N/A'}
                        </p>
                        <button onClick={() => setSelectedMovie(null)}>Close</button>
                      </section>
                    )}
                  </div>
                </main>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Auth0Provider>
  )
}

export default App