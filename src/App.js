import { useEffect, useState } from "react";
import axios from "axios";
import { BreweryTable } from "./components/BreweryTable";

import "./App.css";

const url = "https://api.openbrewerydb.org/breweries";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axios.get(url);
        if (status !== 200) {
          throw new Error("Data could not be fetched");
        }
        setBreweries(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!locationFilter && !searchTerm && breweries) {
      setFiltered(breweries);
      return;
    }
    
    const handleFilterAndSearch = () => {
      const filteredByState = breweries.filter((f) => {
        return f.state.toLowerCase() === locationFilter.toLowerCase();
      });

      if (filteredByState.length > 0) {
        if (searchTerm) {
          setFiltered(
            filteredByState.filter((f) => {
              return (
                f.name.toLowerCase().includes(searchTerm) ||
                f.city.toLowerCase().includes(searchTerm)
              );
            })
          );
        } else {
          setFiltered(filteredByState);
        }
        return;
      }

      if (searchTerm) {
        setFiltered(
          breweries.filter((f) => {
            return (
              f.name.toLowerCase().includes(searchTerm) ||
              f.city.toLowerCase().includes(searchTerm)
            );
          })
        );
        return;
      }

      setFiltered(breweries);
    };

    handleFilterAndSearch();
  }, [locationFilter, searchTerm, breweries]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStateFiltered = (e) => {
    setLocationFilter(e.target.value.toLowerCase());
  };

  const stateFilter = () => {
    const states = [
      ...new Set(
        breweries.map((brewery) => {
          return brewery.state;
        })
      ),
    ].sort();

    return (
      <>
        <select onChange={handleStateFiltered}>
          <option value={""}>All States</option>
          {states.map((state) => {
            return (
              <option value={state} key={state}>
                {state}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  return (
    <div className="App">
      <h1>Breweries</h1>
      <div className="searchBar">
        <input
          onChange={handleChange}
          placeholder="search"
          name="name-city-search"
        ></input>
        {stateFilter()}
      </div>

      <BreweryTable breweries={filtered} />
    </div>
  );
}

export default App;
