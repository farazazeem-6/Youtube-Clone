import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_SUGGESTION_API } from "../utils/constants";

export function useFetchSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(fetchData, 200); // debounce

    async function fetchData() {
      try {
        const res = await fetch(YOUTUBE_SEARCH_SUGGESTION_API(query));
        const json = await res.json();
        setSuggestions(json.items || []);
      } catch (err) {
        console.error("Suggestion error:", err);
      }
    }

    return () => clearTimeout(timer);
  }, [query]);

  return suggestions;
}
