import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");



  return (
    <SearchContext.Provider value={[query, setQuery]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch= () => useContext(SearchContext);

export {useSearch,SearchProvider};