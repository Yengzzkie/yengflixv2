import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import useLocalStorage from '../utils/useLocalStorage';

export const MovieDataContext = createContext();
export const PageContext = createContext();
export const TvDataContext = createContext();
export const MyListContext = createContext();
export const AddedToListContext = createContext();

export default function Root() {
  const [data, setData] = useState(null);
  const [tvData, setTvData] = useState(null);
  const [myList, setMyList] = useLocalStorage('myList', []); // Use custom hook
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTkwMGIwZmVhZjZjZjVkMjk0MDc1YjAxNDRkMmZiYSIsInN1YiI6IjY2MTA4NDQ1NWIzNzBkMDE3MDYzMzFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2V8Oru9xaAu4JLQPZw_nqv_lVULwa-ZPfq8ruQHwvg",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day`,
          options
        );
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const result = await response.json();
        const modResult = await result.results;
        const newMovieArray = modResult.map(movies => ({ ...movies, type: "movie" }));
        console.log(newMovieArray);
        setData(newMovieArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day`,
          options
        );
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const result = await response.json();
        const newTVArray = result.results.map(tv => ({ ...tv, type: "tv" }));
        setTvData(newTVArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <PageContext.Provider value={{ currentPage, setCurrentPage }}>
        <TvDataContext.Provider value={{ tvData, setTvData }}>
          <MovieDataContext.Provider value={{ data, setData }}>
            <MyListContext.Provider value={{ myList, setMyList }}>
              <AddedToListContext.Provider value={{ added, setAdded }}>
                <Navigation />
                <Outlet />
              </AddedToListContext.Provider>
            </MyListContext.Provider>
          </MovieDataContext.Provider>
        </TvDataContext.Provider>
      </PageContext.Provider>
    </>
  );
}
