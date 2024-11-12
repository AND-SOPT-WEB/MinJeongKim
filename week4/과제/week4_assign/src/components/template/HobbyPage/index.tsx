import React, { useState } from 'react';

import styled from '@emotion/styled';
import Input from '../../atom/Input';
import Button from '../../atom/Button';

const HobbyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
`;

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const HobbyContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 1rem 0;
`;

const HobbyContentsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const HobbyContent = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
`;

interface props {
  params: { no: string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HobbyPage = ({ params, onChange }: props) => {
  const onSearchClick = () => {
    // 검색 버튼 클릭 시 실행되는 함수
  };
  console.log(params);
  return (
    <HobbyPageWrap>
      <PageTitle>취미</PageTitle>
      <HobbyContentsWrap>
        <HobbyContentsTitle>취미</HobbyContentsTitle>
        <HobbyContent>취미가 뭔지 여기에 써</HobbyContent>
      </HobbyContentsWrap>
      <HobbyContentsWrap>
        <HobbyContentsTitle>다른 사람들의 취미</HobbyContentsTitle>
        <Input
          onChange={onChange}
          name="no"
          placeholder={'사용자 번호'}
          type={'number'}
        />
        <Button onClick={onSearchClick} disabled={params.no === ''}>
          검색
        </Button>
      </HobbyContentsWrap>
    </HobbyPageWrap>
  );
};

export default HobbyPage;
