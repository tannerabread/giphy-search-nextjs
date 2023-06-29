import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";

import styles from "@/styles/layout/SearchBar.module.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useRef(debounce(onSearch, 500)).current;

  useEffect(() => {
    if (typeof router.query.search === "string") {
      setSearchValue(router.query.search);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [router.query.search, debouncedSearch]);

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { value } = event.target;
    setSearchValue(value);
    debouncedSearch(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      event.preventDefault();
      debouncedSearch.cancel();
      onSearch(searchValue);
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search for a GIF..."
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
    </div>
  );
}
