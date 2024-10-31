import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const GameWrap = styled.div`
  align-content: center;
  text-align: center;
  margin: 4rem;
`;

const GameBody = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${levelSet[props.level].size}, 0.1fr)`};
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

const levelSet = {
  level1: { size: 3, max: 18 },
  level2: { size: 4, max: 32 },
  level3: { size: 5, max: 50 },
};

const Game = ({ level = "level1", setMenu, time, setTime }) => {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setsecondList] = useState([]);
  const [clicked, setClicked] = useState(Array(9).fill(false));
  const [nextNumber, setNextNumber] = useState(1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /**
   * @description 레벨에 맞는 배열 2개 (앞면,뒷면) 생성
   */
  const setArray = () => {
    const { size, max } = levelSet[level];
    const array = Array.from({ length: size * size }, (_, index) => index + 1);
    const arraySecond = Array.from(
      { length: max - size * size },
      (_, index) => index + size * size + 1,
    );
    shuffleArray(array);
    shuffleArray(arraySecond);
    setFirstList(array);
    setsecondList(arraySecond);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setArray();
    setNextNumber(1);
  }, [level]);

  /**
   * @description 버튼 클릭시, 해당 번호와 다음 번호 비교
   * @param index
   */
  const handleClick = (index) => {
    const { size, max } = levelSet[level];

    // 다음 번호가 맞을 경우만 클릭가능
    if (firstList[index] === nextNumber) {
      const newClicked = [...clicked];
      newClicked[index] = true;
      setClicked(newClicked);

      const updatedNumlist = [...firstList];
      // 클릭하면, 해당 Index에 두번째 세트(10~18) 로 변경
      if (nextNumber < max) {
        updatedNumlist[index] = secondList[nextNumber - 1];
      }

      if (nextNumber > max / 2) {
        // 10 이상 클릭시, 해당 번호에 null 넣기
        updatedNumlist[index] = null;
      }
      setFirstList(updatedNumlist);

      if (nextNumber === max) {
        alert("게임 종료!");
        setTimer(false); // 타이머 종료
      } else {
        setNextNumber(nextNumber + 1);
      }
    }
  };

  /**
   * @description 현재 시간 포맷팅
   */
  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const period = hours < 12 ? "오전" : "오후";
    const formattedHours = hours % 12 || 12;

    return `${year}. ${month}. ${day}. ${period} ${formattedHours}:${minutes}:${seconds}`;
  };

  /**
   * @description 랭킹 저장
   */
  const saveRanking = () => {
    const ranking = localStorage.getItem("ranking");
    const rankingData = ranking ? JSON.parse(ranking) : [];

    rankingData.push({ timestamp: formatDate(), level, time: time.toFixed(2) });
    localStorage.setItem("ranking", JSON.stringify(rankingData));
  };

  /**
   * @description 타이머 시작/종료
   * @param state
   */
  const setTimer = (state) => {
    setIsTimerRunning(state);
    if (!state) {
      // 타이머 종료 시
      setTime(0);
      setMenu("ranking");
      saveRanking();
    }
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  return (
    <GameWrap>
      <div>다음 숫자 : {nextNumber}</div>
      <GameBody level={level}>
        {firstList.map((num, index) =>
          num === null ? (
            <Placeholder key={index}></Placeholder>
          ) : (
            <GameButton
              key={index}
              onClick={() => {
                handleClick(index);
                if (nextNumber === 1) {
                  setTimer(true);
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
