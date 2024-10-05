/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import "./styles.css";
import { SuggestionList } from "./SuggestionList";
import { debounce } from "../utils";
type Props = {
  fetchSuggestion: (query: string) => Promise<string[]>;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any;
  onSelect: (suggestion: any) => void;
  onBlur: () => void;
  onFocus: () => void;
  onChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staticData?: any;
  datakey?: string;
};

const Autocomplete = (props: Props) => {
  const {
    placeholder,
    onBlur,
    onFocus,
    onChange,
    staticData,
    fetchSuggestion,
    onSelect,
    datakey,
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
    onChange(value);
  };

  const getSuggestion = async (query: string) => {
    console.log({ query });

    setError(null);
    setLoading(true);
    try {
      let result = [];
      if (staticData) {
        result = staticData?.map((data: string) =>
          data.toLowerCase().includes(query)
        );
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      console.log({ result });
      setSuggestions(result);
    } catch (error) {
      console.log(error);
      setError("Failed to load suggestion");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getDebounced = useCallback(debounce(getSuggestion), []);

  useEffect(() => {
    if (inputValue?.length) {
      // console.log({de:getDebounced(inputValue)})
      getDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: any) => {
    setInputValue(datakey ? suggestion[datakey] : datakey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="typeahead-container">
      <input
        type="text"
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        value={inputValue}
      />
      {suggestions?.length || error || loading ? (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">loading..</div>}
          <SuggestionList
            suggestions={suggestions}
            input={inputValue}
            onSuggestionClick={handleSuggestionClick}
            datakey={datakey}
          />
        </ul>
      ) : null}
    </div>
  );
};

export { Autocomplete };
