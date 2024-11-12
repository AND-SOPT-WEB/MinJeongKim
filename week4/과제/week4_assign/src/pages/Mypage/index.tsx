import styled from '@emotion/styled';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { useParams } from '../../hooks/useParams.ts';

const MypageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface MypageProps {
  page: 'hobby' | 'info';
}

const Mypage = () => {
  const { params, handleChange } = useParams<MypageProps>({ page: 'hobby' });

  return (
    <>
      <Header onClick={handleChange} />
      <MypageWrap>
        {params.page === 'hobby' ? (
          <div>취미 페이지</div>
        ) : (
          <div>내 정보 페이지</div>
        )}
      </MypageWrap>
    </>
  );
};

export default Mypage;
