

import React from 'react';
import styled from '@emotion/styled';

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 1rem;
  padding: 5px 10px;
  background-color: #fff;
  border: unset;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
    
`;

const LevelSelect = styled.select`
  margin: 0 1rem;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  
`;


const Header = ({ menu="game" }) => {
  return (
    <HeaderWrap>
      <h1>1 to 50 </h1>
      <Button>게임</Button>
      <Button>랭킹</Button>
      <LevelSelect>
        <option value="easy">Level 1</option>
        <option value="normal">Level 2</option>
        <option value="hard">Level 3</option>
      </LevelSelect>
    </HeaderWrap>
  );
}

export default Header;