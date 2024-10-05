import { useState, ChangeEvent, KeyboardEvent } from "react";
import { BANK_UPI_HANDLES } from "../constant";

const Form = () => {
  const [upiId, setUpiId] = useState<string>();
  const [prediction, setPrediction] = useState<string>();
  const [predictions, setPredictions] = useState<string[]>([]);

  const handleUpi = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setUpiId(value);
    if (!value || !value.includes("@")) {
      setPrediction(value || "");
      setPredictions([]);
      return;
    }
    const [currentUserName, currentBankName] = value.split("@");
    if (!currentUserName || !currentBankName) {
      return;
    }
    const regex = new RegExp(`${currentBankName}`);
    const matchedBankNames = BANK_UPI_HANDLES.filter((bankName) =>
      regex.test(bankName)
    );

    let currentPrediction = matchedBankNames[0];
    if (currentBankName && !matchedBankNames.length) {
      currentPrediction = "";
    }

    setPrediction(`${currentUserName}@${currentPrediction}`);
    setPredictions([...matchedBankNames]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === "ArrowRight" && prediction) {
      setUpiId(prediction);
    }
  };

  const handleBankNameClick = (prediction: string) => {
    if (!upiId) return;
    const [currentUserName] = upiId.split("@");

    const updateUpiId = `${currentUserName}@${prediction}`;

    setUpiId(updateUpiId);
    setPrediction(updateUpiId);
    setPredictions([]);
  };

  return (
    <form>
      <div className="input-container">
        <input
          type="text"
          value={prediction}
          onChange={() => {}}
          className="prediction"
        />
        <br />
        <input
          type="text"
          value={upiId}
          onChange={handleUpi}
          onKeyDown={handleKeyPress}
          pattern=".+@.+"
          className="upi"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <br />
      <button>Pay Now</button>
      {predictions.length ? (
        <ul className="predictions">
          {predictions.map((prediction) => {
            return (
              <li
                key={prediction}
                onClick={() => handleBankNameClick(prediction)}
              >
                {prediction}
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
};

export { Form };
