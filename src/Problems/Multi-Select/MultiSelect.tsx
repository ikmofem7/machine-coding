import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./MultiSelect.css";
import states from "./states.json";

const MultiSelect = () => {
  const [isDropdownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [selectedStates, setSelectedStates] = useState<{
    [key: string]: {
      isChecked: boolean;
    };
  }>({});
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target !== dropDownRef.current) {
        setIsDropDownVisible(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleToggleDropdown = () => {
    setIsDropDownVisible((prevState) => !prevState);
  };

  const handleCheckboxChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setSelectedStates((prevState) => {
        return {
          ...prevState,
          [key]: {
            isChecked: checked,
          },
        };
      });
    };

  const numberOfStatesSelected = Object.values(selectedStates).reduce(
    (accu, current) => {
      if (current?.isChecked) {
        accu += 1;
      }
      return accu;
    },
    0
  );

  return (
    <div
      className="multi-select"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button className="select-btn" onClick={handleToggleDropdown}>
        <span>
          {numberOfStatesSelected
            ? `${numberOfStatesSelected} selected`
            : "Select the State"}
        </span>
        {isDropdownVisible ? <span>&#8963;</span> : <span>&#8964;</span>}
      </button>
      {isDropdownVisible && (
        <div className="dropdown" ref={dropDownRef}>
          {states.map((state) => {
            const isChecked = selectedStates[state.abbreviation]?.isChecked;
            return (
              <label
                key={state.abbreviation}
                htmlFor={state.abbreviation}
                className={isChecked ? "selected" : ""}
              >
                <input
                  type="checkbox"
                  id={state.abbreviation}
                  onChange={handleCheckboxChange(state.abbreviation)}
                  checked={isChecked}
                />
                {state.name}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { MultiSelect };
