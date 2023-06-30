import { createContext, useContext, useState, ReactNode } from "react";

import { Gif } from "@/utils/giphy-api";

interface SearchState {
  gifs: Gif[];
  offset: number;
  term: string;
}

interface SearchStates {
  [key: string]: SearchState;
}

type SearchContextType = {
  searches: string[];
  selectedSearch: string;
  searchStates: SearchStates;
  addSearch: (search: string) => void;
  updateSelectedSearch: (value: string) => void;
  updateSearchState: (searchTerm: string, newSearchState: SearchState) => void;
};

const SearchContext = createContext<SearchContextType>({
  searches: [],
  selectedSearch: "",
  searchStates: {},
  addSearch: () => {},
  updateSelectedSearch: () => {},
  updateSearchState: () => {},
});

export const useSearches = () => useContext(SearchContext);

type SearchProviderProps = { children: ReactNode };

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searches, setSearches] = useState<string[]>([]);
  const [selectedSearch, setSelectedSearch] = useState<string>("");
  const [searchStates, setSearchStates] = useState<SearchStates>({});

  const addSearch = (search: string) => {
    setSearches((prevSearches) => {
      if (prevSearches.includes(search)) return prevSearches;
      return [search, ...prevSearches];
    });
  };

  const updateSelectedSearch = (value: string) => {
    setSelectedSearch(value);
  };

  const updateSearchState = (
    searchTerm: string,
    newSearchState: SearchState
  ) => {
    setSearchStates((prevSearchStates) => ({
      ...prevSearchStates,
      [searchTerm]: newSearchState,
    }));
  };

  return (
    <SearchContext.Provider
      value={{
        searches,
        selectedSearch,
        searchStates,
        addSearch,
        updateSelectedSearch,
        updateSearchState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
