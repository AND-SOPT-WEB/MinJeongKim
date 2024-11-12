import React, { useState } from 'react';

import styled from '@emotion/styled';

const HeaderWrap = styled.div`
  display: flex;
  padding: 0 2rem;
  align-items: center;
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.white};
`;

const HeaderMenu = styled.div`
  display: flex;
  margin-right: auto;
`;

const HeaderMenuItem = styled.div`
  margin: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
`;

interface props {
  onClick: (key: string, value: string) => void;
}

const Header = ({ onClick }: props) => {
  const onLogoutClick = () => {
    alert('로그아웃 되었습니다.');
  };

  return (
    <HeaderWrap>
      <HeaderTitle>마이페이지</HeaderTitle>
      <HeaderMenu>
        <HeaderMenuItem
          onClick={() => {
            onClick('page', 'hobby');
          }}
        >
          취미
        </HeaderMenuItem>
        <HeaderMenuItem
          onClick={() => {
            onClick('page', 'info');
          }}
        >
          내정보
        </HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenuItem onClick={onLogoutClick}>로그아웃</HeaderMenuItem>
    </HeaderWrap>
  );
};

export default Header;
