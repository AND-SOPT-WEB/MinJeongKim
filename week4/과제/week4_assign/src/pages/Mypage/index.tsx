import styled from '@emotion/styled';
import React, { useState } from 'react';
import Header from '../../components/atom/Header';
import { useParams } from '../../hooks/useParams.ts';
import HobbyPage from '../../components/template/HobbyPage';
import InfoPage from '../../components/template/InfoPage';

const MypageWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface MypageProps {
  page: 'hobby' | 'info';
  no: string;
  password: string;
  hobby: string;
}

const Mypage = () => {
  const { params, handleEventChange, handleChange } = useParams<MypageProps>({
    page: 'hobby',
    no: '',
    password: '',
    hobby: '',
  });

  return (
    <>
      <Header onClick={handleChange} />
      <MypageWrap>
        {params.page === 'hobby' ? (
          <HobbyPage onChange={handleEventChange} params={params} />
        ) : (
          <InfoPage onChange={handleEventChange} params={params} />
        )}
      </MypageWrap>
    </>
  );
};

export default Mypage;
