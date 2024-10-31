import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const GameWrap = styled.div`
  align-content: center;
  text-align: center;
  margin: 4rem;
`;

const GameBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0.1fr);
  grid-gap: 1rem;
  align-content: center;
  justify-content: center;
  margin: 2rem;
`;

const GameButton = styled.button`
  width: 5rem;
  height: 5rem;
  font-size: 24px;
  border: unset;
  background-color: ${(props) => props.theme.colors.tertiary};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Placeholder = styled.div`
  background-color: unset;
  width: 5rem;
  height: 5rem;
`;

const Game = ({ startTimer }) => {
  const [numlist, setNumlist] = useState([]);
  const [clicked, setClicked] = useState(Array(9).fill(false));
  const [nextNumber, setNextNumber] = useState(1);
  const [secondSet, setSecondSet] = useState([]);
  const [is10over, setIs10over] = useState(false);

  useEffect(() => {
    const shuffledNumbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const shuffledNumbersSecond = shuffleArray([
      10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    setNumlist(shuffledNumbers);
    setSecondSet(shuffledNumbersSecond);
    setNextNumber(1);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = (index) => {
    // 다음 번호가 맞을 경우만 클릭가능
    if (numlist[index] === nextNumber) {
      const newClicked = [...clicked];
      newClicked[index] = true;
      setClicked(newClicked);

      const updatedNumlist = [...numlist];
      // 클릭하면, 해당 Index에 두번째 세트(10~18) 로 변경
      if (nextNumber < 18) {
        updatedNumlist[index] = secondSet[nextNumber - 1];
      }

      if (nextNumber > 9) {
        // 10 이상 클릭시, 해당 번호에 null 넣기
        updatedNumlist[index] = null;
      }
      setNumlist(updatedNumlist);

      if (nextNumber === 18) {
        alert("게임 종료!");
        startTimer(false); // 타이머 종료
      } else {
        setNextNumber(nextNumber + 1);
      }
    }
  };

  return (
    <GameWrap>
      <div>다음 숫자 : {nextNumber}</div>
      <GameBody>
        {numlist.map((num, index) =>
          num === null ? (
            <Placeholder key={index}></Placeholder>
          ) : (
            <GameButton
              key={index}
              onClick={() => {
                handleClick(index);
                if (nextNumber === 1) {
                  startTimer(true);
                }
              }}
            >
              {num}
            </GameButton>
          ),
        )}
      </GameBody>
    </GameWrap>
  );
};

export default Game;
