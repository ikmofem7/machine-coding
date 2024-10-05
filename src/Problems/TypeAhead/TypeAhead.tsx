import { Autocomplete } from "./components";

const TypeAhead = () => {
  const fetchSuggestions = async (query: string) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes as string[];
  };

  return (
    <Autocomplete
      fetchSuggestion={fetchSuggestions}
      placeholder="Type here"
      styles={undefined}
      onSelect={() => {}}
      onBlur={() => {}}
      onFocus={() => {}}
      onChange={() => {}}
      datakey={"name"}
    />
  );
};

export { TypeAhead };
