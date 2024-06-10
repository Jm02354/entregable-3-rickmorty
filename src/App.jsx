import { useEffect, useRef, useState } from "react";
import "./App.css";
import LocationCard from "./components/LocationCard";
import ResidentCard from "./components/ResidentCard";
import useFetch from "./hooks/useFetch";
import Paginate from "./components/Paginate";

function App() {
  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [page, setPage] = useState(1);
  const [location, getLocation, isLoading, hasError] = useFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = "";
  };

  const quantity = 6;
  const total = Math.ceil(location?.residents?.length / quantity);
  const pagination = () => {
    const end = quantity * page;
    const start = end - quantity;
    const loc = location?.residents?.slice(start, end);
    return [loc];
  };

  return (
    <div className="app">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <header className="banner">
            <img src="../rick-and-morty.jpg" alt="banner" />
          </header>
          <form className="app__form" onSubmit={handleSubmit}>
            <input className="app__form-input" ref={textInput} type="number" />
            <button className="app__form-btn">Search</button>
          </form>

          <Paginate page={page} setPage={setPage} total={total} />

          {hasError || !+inputValue || inputValue < 1 || inputValue > 126? (
            <h2>❌ Hey! you must provide an id from 1 to 126 😒</h2>
          ) : (
            <>
              <LocationCard info={location} />
              <div className="app__container">
                {pagination()[0]?.map((character) => (
                  <ResidentCard key={character} info={character} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
