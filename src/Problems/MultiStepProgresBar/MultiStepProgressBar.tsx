import { useState } from "react";
import "./index.css";

type Step = {
  active?: boolean;
  key: string;
};

const defaultStep: Step[] = [
  {
    key: "1",
    active: true,
  },
  {
    key: "2",
  },
  {
    key: "3",
  },
  {
    key: "4",
  },
];

const MultiStepProgressBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateStep = (action: "prev" | "next") => {
    if (action === "next") {
      setActiveIndex((prev) => prev + 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };
  const indicatorWidth = `${(activeIndex / (defaultStep.length - 1)) * 100}%`;
  return (
    <div className="multi-step-container">
      <div className="steps">
        {defaultStep.map((step, index) => {
          const { key } = step;
          return (
            <span
              className={`${index <= activeIndex ? "active" : ""} circle`}
              key={key}
            >
              {key}
            </span>
          );
        })}
        <div className="progress">
          <div className="indicator" style={{ width: indicatorWidth }}></div>
        </div>
      </div>
      <div className="button-container">
        <button
          id="#prev"
          disabled={activeIndex === 0}
          onClick={() => updateStep("prev")}
        >
          Prev
        </button>
        <button
          id="#next"
          disabled={activeIndex === defaultStep.length - 1}
          onClick={() => updateStep("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { MultiStepProgressBar };
