import { useState, ChangeEvent, useEffect } from "react";
import states from "./states.json";
import "./index.css";
const MultiSelectPractice = () => {
  const [isDropdownVisible, setIsdropdownVisible] = useState<boolean>();
  const [selectedState, setSelectedState] = useState<{
    [key: string]: {
      isChecked: boolean;
    };
  }>();
  const handleToggleDropdown = () => {
    setIsdropdownVisible((prev) => !prev);
  };

  const handleSelectState = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectedState((prevState) => {
      return {
        ...prevState,
        [id]: {
          isChecked: checked,
        },
      };
    });
  };

  useEffect(() => {
    function closeSelectDropdown() {
      if (isDropdownVisible) {
        setIsdropdownVisible(false);
      }
    }

    document.body.addEventListener("click", closeSelectDropdown);
    return () =>
      document.body.removeEventListener("click", closeSelectDropdown);
  }, [isDropdownVisible]);

  return (
    <div
      className="multi-select-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <button onClick={handleToggleDropdown} className="state-button">
          Select State
        </button>
      </div>
      {isDropdownVisible && (
        <div className="dropdown-container">
          {states.map((state) => {
            const { name, abbreviation } = state;
            const isChecked = selectedState?.[abbreviation]?.isChecked || false;
            return (
              <div key={abbreviation} className="label-container">
                <input
                  type="checkbox"
                  name={abbreviation}
                  id={abbreviation}
                  onChange={handleSelectState}
                  checked={isChecked}
                />
                <label htmlFor={abbreviation}>{name}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { MultiSelectPractice };
