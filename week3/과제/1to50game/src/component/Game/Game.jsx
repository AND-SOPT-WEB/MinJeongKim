import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styled from "@emotion/styled";

const GameWrap = styled.div`
  align-content: center;
  text-align: center;
  margin: 4rem;
`;

const GameBody = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${levelSet[props.level].size}, 0fr)`};
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
  &:active {
    opacity: 0.6;
    transform: scale(0.92);
  }
`;

const Placeholder = styled.div`
  background-color: unset;
  width: 5rem;
  height: 5rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  align-content: center;
  width: 20rem;
  height: 10rem;
`;

const levelSet = {
  level1: { size: 3, max: 18 },
  level2: { size: 4, max: 32 },
  level3: { size: 5, max: 50 },
};

const Game = ({ level = "level1", time, setTimer, setIsTimerRunning }) => {
  const { size, max } = levelSet[level];
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [clicked, setClicked] = useState(Array(size * size).fill(false));
  const [nextNumber, setNextNumber] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * @description 레벨에 맞는 배열 2개 (앞면,뒷면) 생성 + 섞기
   */
  const setArray = () => {
    const createShuffledArray = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => i + start).sort(
        () => Math.random() - 0.5,
      );

    setFirstList(createShuffledArray(1, size * size));
    setSecondList(createShuffledArray(size * size + 1, max));
  };

  useEffect(() => {
    setArray();
    setNextNumber(1);
    setClicked(Array(size * size).fill(false));
  }, [level]);

  /**
   * @description 게임 초기화
   */
  const resetGame = () => {
    setArray();
    setTimer();
    setNextNumber(1);
    setClicked(Array(size * size).fill(false));
  };

  /**
   * @description 버튼 클릭시, 해당 번호와 다음 번호 비교
   * @param index
   */
  const handleClick = (index) => {
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

      // 게임 종료
      if (nextNumber === max) {
        setIsModalOpen(true);
        saveRanking();
        setIsTimerRunning(false);
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
    const rankingData = JSON.parse(localStorage.getItem("ranking") || []);
    rankingData.push({ timestamp: formatDate(), level, time: time.toFixed(2) });
    localStorage.setItem("ranking", JSON.stringify(rankingData));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetGame();
  };

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
                if (num == 1 && nextNumber === 1) {
                  setTimer(true);
                }
              }}
            >
              {num}
            </GameButton>
          ),
        )}
      </GameBody>
      {isModalOpen &&
        createPortal(
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>게임 종료!</h2>
              <p>소요 시간: {time.toFixed(2)}초</p>
              <button onClick={closeModal}>닫기</button>
            </ModalContent>
          </ModalOverlay>,
          document.getElementById("modal"),
        )}
    </GameWrap>
  );
};

export default Game;
