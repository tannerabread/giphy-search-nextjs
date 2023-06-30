import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSearches } from "@/contexts/SearchContext";
import { SearchProps } from "@/components/layout/SearchBar";
import styles from "@/styles/layout/SearchDropDown.module.css";

export default function SearchDropDown({ onSearch }: SearchProps): JSX.Element {
  const { searches, selectedSearch, updateSelectedSearch } = useSearches();
  const router = useRouter();

  useEffect(() => {
    if (router.route === "/") {
      updateSelectedSearch("");
    }
  }, [router.route, updateSelectedSearch]);

  function handleSelectionChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const { value } = e.target;
    onSearch(value);
  }

  return (
    <select
      className={styles.dropdown}
      name="searchDropDown"
      onChange={handleSelectionChange}
      value={selectedSearch}
    >
      <option value="">Home</option>
      {searches.map((search) => (
        <option key={search} value={search}>
          {search}
        </option>
      ))}
    </select>
  );
}
