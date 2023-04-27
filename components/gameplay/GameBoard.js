import { useState } from "react";
import GameScoreCard from "./GameScoreCard";
import InstructionModal from "./InstructionModal";
import Keyboard from "./Keyboard";
import WordBox from "./WordBox";

export default function GameBoard() {
  const [wordBoxes, setWordBoxes] = useState(Array(6).fill([]));
  const [currentWbIndex, setCurrentWbIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const getKeyboardInput = (letter) => {
    if (letter === "Enter") {
      // move to next word box if current one is full
      if (wordBoxes[currentWbIndex].length === 5) {
        setCurrentWbIndex((index) => index + 1);
      }
    } else if (letter === "Del") {
      // remove last letter from current word box
      setWordBoxes((boxes) => {
        const currentBox = boxes[currentWbIndex];
        if (currentBox.length > 0) {
          return [
            ...boxes.slice(0, currentWbIndex),
            currentBox.slice(0, -1),
            ...boxes.slice(currentWbIndex + 1),
          ];
        } else {
          return boxes;
        }
      });
    } else {
      // add letter to current word box
      setWordBoxes((boxes) => {
        const currentBox = boxes[currentWbIndex];
        if (currentBox.length < 5) {
          return [
            ...boxes.slice(0, currentWbIndex),
            [...currentBox, letter],
            ...boxes.slice(currentWbIndex + 1),
          ];
        } else {
          return boxes;
        }
      });
    }
  };

  const handleSubmit = async () => {
    const userNumber = localStorage.getItem("userNumber");
    await sendAirtime(userNumber, 100);
    alert("Payment Successful");
  };

  const sendAirtime = async (phoneNumber, amount) => {
    try {
      const response = await fetch("/api/sendAirtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, amount }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Airtime sent successfully:", data.response);
      } else {
        console.error("Error sending airtime inner:", data.error);
      }
    } catch (error) {
      console.error("Error sending airtime outer:", error.message);
    }
  };

  return (
    <div className="h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 md:w-[90%] w-full mx-auto mt-8 py-12 relative">
      {showModal && <InstructionModal clickHandler={displayModal} />}
      {!showModal && (
        <>
          <a href="" className="inline-block absolute top-0 left-[97%]">
            <img
              src="./images/mdi_close-circle.png"
              alt="cancel"
              className="mt-3"
            />
          </a>
          <GameScoreCard clickHandler={displayModal} />
          <div className="mt-5 flex md:w-[60%] w-[100%] mx-auto gap-12">
            <div className="w-[50%]">
              {wordBoxes.slice(0, 3).map((box, index) => (
                <WordBox key={index} wordArray={box} />
              ))}
            </div>
            <div className="w-[50%]">
              {wordBoxes.slice(3).map((box, index) => (
                <WordBox key={index} wordArray={box} />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <Keyboard clickHandler={getKeyboardInput} />
          </div>
          <div className="mt-5">
            <button className="btn block mx-auto" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
