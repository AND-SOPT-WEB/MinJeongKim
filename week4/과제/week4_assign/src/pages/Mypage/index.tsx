import styled from '@emotion/styled';
import React, { useState } from 'react';
import Header from '../../components/atom/Header';
import { useParams } from '../../hooks/useParams.ts';
import HobbyPage from '../../components/template/HobbyPage';

const MypageWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface MypageProps {
  page: 'hobby' | 'info';
  no: string;
}

const Mypage = () => {
  const { params, handleEventChange, handleChange } = useParams<MypageProps>({
    page: 'hobby',
    no: '',
  });

  return (
    <>
      <Header onClick={handleChange} />
      <MypageWrap>
        {params.page === 'hobby' ? (
          <HobbyPage onChange={handleEventChange} params={params} />
        ) : (
          <div>내 정보 페이지</div>
        )}
      </MypageWrap>
    </>
  );
};

export default Mypage;
