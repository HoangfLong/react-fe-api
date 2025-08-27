import { useContext, useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { getPopularMovies, searchrMovies } from "../Services/api";
import { AppContext } from "../Context/AppContext";

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadPopularMovies = async () => {
//       try{
//         const popularMovies = await getPopularMovies()
//         setMovies(popularMovies);
//       } catch (err) {
//         console.log(err)
//         setError("Failed to lead movies....")
//       }
//       finally {
//         setLoading(false)
//       }
//     }
//     loadPopularMovies()
//   }, []);

//   // const movies =
//   // [
//   //   { id: 1, title: "CUm master", release_date: "2055" },
//   //   { id: 2, title: "Hiho", release_date: "2056" },
//   //   { id: 3, title: "fas", release_date: "2045" },
//   //   { id: 4, title: "Moe", release_date: "2025" },
//   // ];

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if(!searchQuery.trim()) return
//     if (loading) return

//     setLoading(true);

//     try {
//       const searchResult = await searchrMovies(searchQuery)
//       setMovies(searchResult)
//       setError(null)
//     } catch (err){
//       console.log(err)
//       setError("Failed to search")
//     }
//     finally {
//       setLoading(false)
//     }

//     // setSearchQuery("");
//   };

//   return (
//     <>
//       <div className="home">
//         <form onSubmit={handleSearch} className="search-form">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="search-input"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="search-button">
//             Search
//           </button>
//         </form>
//         <div className="movies-grid">
//           {movies.map(
//             (movie) =>
//               //movie.title.toLowerCase().startsWith(searchQuery) &&
//             (
//                 <MovieCard movie={movie} key={movie.id} />
//               )
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

export default function Home() {
  const { name } = useContext(AppContext);

  const [tours, setTours] = useState([]);

  async function getTours() {
    const response = await fetch("/api/v1/tours", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data.tours);

    if (response.ok) {
      setTours(data.tours.data);
    }
  }

  useEffect(() => {
    getTours();
  }, []);

  return (
    <>
      <div>
        <h1 className="title">Welcome Home {name}</h1>
        <h2 className="title">Tours</h2>
        {tours.map((tour) => (
        <li key={tour.id}>{tour.title}</li>
      ))}
      </div>
    </>
  );
}
