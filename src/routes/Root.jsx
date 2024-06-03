import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { 
  MovieDataContext, AllMoviesContext, TvDataContext, AllTVContext, 
  MyListContext, MoviePageContext, TvPageContext, AddedToListContext, 
  LoadingContext, ErrorContext, CurrentDateContext, SearchResultContext, 
  SearchInputContext, RecentlyViewedContext, ContinueWatchContext 
} from "../utils/context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Root() {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState(null);
  const [tvSeries, setTvSeries] = useState(null);
  const [topTV, setTopTV] = useState(null);
  const [myList, setMyList] = useLocalStorage("myList", []);
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState(() => {return JSON.parse(localStorage.getItem("recentlyViewed")) || []});
  const [continueWatch, setContinueWatch] = useState(() => {return JSON.parse(localStorage.getItem("continueWatch")) || []});

  const bearerToken = import.meta.env.VITE_BEARER;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${bearerToken}`,
    },
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
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
        const newMovieArray = modResult.map((movies) => ({
          ...movies,
          type: "movie",
        }));
        setData(newMovieArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
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
        const newTVArray = result.results.map((tv) => ({ ...tv, type: "tv" }));
        setTopTV(newTVArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviePage}&sort_by=popularity.desc`,
          options
        );
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const result = await response.json();
        const modResult = await result.results;
        const newMovieArray = modResult.map((movies) => ({
          ...movies,
          type: "movie",
        }));
        setMovies(newMovieArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [moviePage]);

  useEffect(() => {
    const fetchAllTV = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?page=${tvPage}`,
          options
        );
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const result = await response.json();
        const modResult = await result.results;
        const newMovieArray = modResult.map((movies) => ({
          ...movies,
          type: "tv",
        }));
        setTvSeries(newMovieArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTV();
  }, [tvPage]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchInput.trim() === "") {
        setSearchResults(searchResults);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchInput}`, options);
        if (!response.ok) {
          throw new Error("HTTP request unsuccessful");
        }
        const data = await response.json();
        console.log(data.results);
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSearchResults();
    }, 900); // debounce delay

    return () => clearTimeout(debounceFetch);
  }, [searchInput]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <>
      <TvPageContext.Provider value={{ tvPage, setTvPage }}>
        <MoviePageContext.Provider value={{ moviePage, setMoviePage }}>
          <TvDataContext.Provider value={{ topTV, setTopTV }}>
            <AllTVContext.Provider value={{ tvSeries, setTvSeries }}>
              <MovieDataContext.Provider value={{ data, setData }}>
                <AllMoviesContext.Provider value={{ movies }}>
                  <MyListContext.Provider value={{ myList, setMyList }}>
                    <AddedToListContext.Provider value={{ added, setAdded }}>
                      <ErrorContext.Provider value={{ setError }}>
                        <LoadingContext.Provider value={{ setLoading }}>
                          <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
                            <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
                              <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
                                <RecentlyViewedContext.Provider value={{ recentlyViewed, setRecentlyViewed }}>
                                  <ContinueWatchContext.Provider value={{ continueWatch, setContinueWatch }}>
                                    <Navigation />
                                    <Outlet />
                                    <ToastContainer />
                                    <Footer />
                                  </ContinueWatchContext.Provider>
                                </RecentlyViewedContext.Provider>
                              </SearchResultContext.Provider>
                            </SearchInputContext.Provider>
                          </CurrentDateContext.Provider>
                        </LoadingContext.Provider>
                      </ErrorContext.Provider>
                    </AddedToListContext.Provider>
                  </MyListContext.Provider>
                </AllMoviesContext.Provider>
              </MovieDataContext.Provider>
            </AllTVContext.Provider>
          </TvDataContext.Provider>
        </MoviePageContext.Provider>
      </TvPageContext.Provider>
    </>
  );
}
