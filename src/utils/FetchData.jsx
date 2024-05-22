// import { useContext, useEffect, useState } from "react";
// import { DataContext, PageContext } from "../routes/Root";

// export default function FetchData() {

//     const { data, setData } = useContext(DataContext)
//     const { currentPage } = useContext(PageContext)
    
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const options = {
//         method: "GET",
//         headers: {
//             accept: "application/json",
//             Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTkwMGIwZmVhZjZjZjVkMjk0MDc1YjAxNDRkMmZiYSIsInN1YiI6IjY2MTA4NDQ1NWIzNzBkMDE3MDYzMzFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2V8Oru9xaAu4JLQPZw_nqv_lVULwa-ZPfq8ruQHwvg",
//         },
//     };

//     useEffect(() => {
//         const fetchMovies = async () => {
//             try {
//                 const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`, options);
//                 if (!response.ok) {
//                     throw new Error('HTTP request unsuccessful');
//                 }
//                 const result = await response.json();
//                 setData(result);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, [currentPage]);

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error: {error}</p>
//     if (!data) return null

    

//     return (
//         <div>
//             <h1>Now Playing Movies</h1>
//             <ul>
//                 {data.results.map(movie => (
//                     <li key={movie.id}>{movie.title}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

