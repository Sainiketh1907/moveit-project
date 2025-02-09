# MovieIt - Movie Search Application

A modern React-based web application that allows users to search and bookmark their favorite movies using the OMDB API.

![MovieIt Screenshot](public/hero.png)

## 🌟 Features

- **Movie Search**: Search through thousands of movies in real-time
- **User Authentication**: Secure login system with email validation
- **Bookmarking System**: Save and manage your favorite movies
- **Responsive Design**: Works seamlessly across all device sizes
- **Movie Details**: View detailed information including ratings and release dates
- **Real-time Search**: Dynamic search results as you type

## 🚀 Tech Stack

### Frontend
- **React** (v18.2.0): Main frontend framework
- **React Router** (v6.21.0): For handling navigation
- **React Use** (v17.6.0): For custom hooks like debounce

### API Integration
- **OMDB API**: For movie data and search functionality
- **Fetch API**: For handling HTTP requests

### State Management
- Local state management using React's useState and useEffect
- localStorage for persistent data storage

### Styling
- Custom CSS with modern design principles
- CSS Variables for theming
- Flexbox and Grid for layouts
- Responsive design patterns

### Development Tools
- **Vite** (v5.0.8): Build tool and development server
- **ESLint**: Code linting
- **npm**: Package management

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movieit.git
```

2. Install dependencies:
```bash
cd movieit
npm install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🔑 Environment Variables

- `VITE_TMDB_API_KEY`: Your OMDB API key

## 🗂️ Project Structure

```plaintext
movieit/
├── public/
│   ├── bookmark1.png
│   ├── bookmark2.png
│   ├── bookmarkStore.png
│   ├── hero.png
│   ├── moviefav.png
│   └── star.svg
├── src/
│   ├── components/
│   │   ├── BookmarkedMovies.jsx
│   │   ├── Login.jsx
│   │   ├── MovieCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── index.html
```

## 🔒 Authentication

The application uses a simple email-based authentication system:
- Email validation using regex pattern
- Password requirement: minimum 6 characters
- Protected routes for authenticated users
- Persistent login state using localStorage

## 💾 Local Storage

The application uses localStorage to persist:
- User authentication state
- Bookmarked movies
- User email

## 🎨 UI Components

- **MovieCard**: Displays movie information with bookmark functionality
- **Search**: Real-time search input with debounce
- **BookmarkedMovies**: Manages and displays bookmarked movies
- **Login**: Handles user authentication
- **Spinner**: Loading state indicator

## 🔄 API Integration

The application integrates with the OMDB API for:
- Movie searches
- Detailed movie information
- Movie ratings and release dates

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices
- Tablets
- Desktop computers
