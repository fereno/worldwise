import {useContext, useReducer} from "react";
import {createContext, useEffect} from "react";
const BASE_URL = "http://localhost:3000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {...state, isLoading: true};
    case "cities/loaded":
      return {...state, cities: action.payload, isLoading: false};
    case "city/loaded":
      return {...state, currentCity: action.payload, isLoading: false};
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case "rejected":
      return {...state, isLoading: false, error: action.payload};

    default:
      throw new Error("unknown action type ");
  }
};

const CitiesContext = createContext();
function CitiesProvider({children}) {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    dispatch({type: "loading"});
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data});
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities data!",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data});
    } catch {
      dispatch({type: "rejected", payload: "there was an error loading city!"});
    }
  }

  async function createCity(newCity) {
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {"Content-Type": "application/json"},
      });
      const data = await res.json();
      dispatch({type: "city/created", payload: data});
    } catch {
      dispatch({type: "rejected", payload: "there was an error create data!"});
    }
  }

  async function deleteCity(id) {
    dispatch({type: "loading"});
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "city/deleted", payload: id});
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting data!",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{cities, isLoading, currentCity, getCity, createCity, deleteCity}}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the citiesProvider");
  }
  return context;
};
export {CitiesProvider, useCities};
