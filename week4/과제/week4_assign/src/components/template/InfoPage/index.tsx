import React, { useState } from 'react';

import styled from '@emotion/styled';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import axios from '../../../api/axios.ts';
import { PATH_API } from '../../../api/path.ts';

const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
`;

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 1rem 0;
`;

const ContentsTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

interface props {
  params: { password?: string; hobby?: string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfoPage = ({ params, onChange }: props) => {
  // 수정하기 클릭 시 실행되는 함수
  const onSearchClick = async () => {
    if (!params.password && !params.hobby) {
      alert('비밀번호와 취미를 입력해주세요.');
      return;
    }
    const updateParams = {
      password: params.password,
      hobby: params.hobby,
    };
    try {
      const res = await axios.put(PATH_API.USER, updateParams);
      alert('수정되었습니다.');
    } catch (err) {
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <MyPageWrap>
      <PageTitle>내 정보 수정하기</PageTitle>
      <ContentsWrap>
        <ContentsTitle>새 비밀번호</ContentsTitle>
        <Input
          onChange={onChange}
          name="password"
          placeholder={'새 비밀번호'}
          type={'text'}
        />
      </ContentsWrap>
      <ContentsWrap>
        <ContentsTitle>새 취미</ContentsTitle>
        <Input
          onChange={onChange}
          name="hobby"
          placeholder={'새 취미'}
          type={'text'}
        />
        <Button
          onClick={onSearchClick}
          disabled={params.password === '' && params.hobby === ''}
        >
          수정하기
        </Button>
      </ContentsWrap>
    </MyPageWrap>
  );
};

export default InfoPage;
