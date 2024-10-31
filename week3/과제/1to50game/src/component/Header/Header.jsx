import React, { useState } from "react";
import styled from "@emotion/styled";

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Title = styled.h2`
  margin-right: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.bright};
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.secondary
      : props.theme.colors.tertiary}; /* 민트색: 선택됨, 갈색: 선택되지 않음 */
  color: #fff;
  border: unset;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const LevelSelect = styled.select`
  margin: 0 1rem;
  padding: 0.4rem 1rem;
  background-color: ${(props) => props.theme.colors.bright};
  border: unset;
  border-radius: 5px;
`;

const Timer = styled.div`
  margin-left: 1rem;
  width: 3rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.bright};
`;

const Header = ({ menu = "game", setMenu, setLevel, time = 0 }) => {
  const onChangeMenu = (newMenu) => {
    setMenu(newMenu);
  };

  const onChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  return (
    <HeaderWrap>
      <HeaderGroup>
        <Title>1 to 50</Title>
        <Button active={menu === "game"} onClick={() => onChangeMenu("game")}>
          게임
        </Button>
        <Button
          active={menu === "ranking"}
          onClick={() => onChangeMenu("ranking")}
        >
          랭킹
        </Button>
      </HeaderGroup>
      <HeaderGroup>
        <LevelSelect onChange={onChangeLevel}>
          <option value="level1">Level 1</option>
          <option value="level2">Level 2</option>
          <option value="level3">Level 3</option>
        </LevelSelect>
        <Timer>{time}</Timer>
      </HeaderGroup>
    </HeaderWrap>
  );
};

export default Header;
