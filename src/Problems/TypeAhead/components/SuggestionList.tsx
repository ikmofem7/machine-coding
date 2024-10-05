import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T = any> = {
  suggestions: T[];
  datakey?: string;
  input: string;
  onSuggestionClick: (value: T) => void;
};

const SuggestionList = <T,>(props: Props<T>) => {
  const { suggestions, datakey, input, onSuggestionClick } = props;

  const getHighlightText = (suggestion: string, highlight: string) => {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = suggestion.split(regex);

    return (
      <span>
        {parts?.map((part) => {
          if (part.toLowerCase() !== highlight.toLowerCase()) return part;
          return <b>{part}</b>;
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions?.map((suggestion) => {
        const currentSuggestion = datakey ? suggestion[datakey] : suggestion;
        return (
          <li
            key={currentSuggestion}
            className="suggestion-item"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {getHighlightText(currentSuggestion, input)}
          </li>
        );
      })}
    </>
  );
};
export { SuggestionList };
