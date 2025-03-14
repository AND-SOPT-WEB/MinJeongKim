import React, { useEffect, useState } from 'react';

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

const Content = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
`;

interface props {
  params: { no: string };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HobbyPage = ({ params, onChange }: props) => {
  const [hobby, setHobby] = useState('');
  const [otherPeopleHobby, setOtherPeopleHobby] = useState('');

  // 사용자의 취미
  const getHobby = async () => {
    try {
      const res = await axios.get(PATH_API.MY_HOBBY);
      setHobby(res.data.result.hobby);
    } catch (error) {
      console.error('Failed to fetch hobby:', error);
    }
  };

  useEffect(() => {
    getHobby();
  }, []);

  // 검색 버튼 클릭 시 실행되는 함수
  const onSearchClick = async () => {
    if (!params.no) {
      alert('사용자 번호를 입력해주세요.');
      return;
    }
    try {
      const res = await axios.get(`${PATH_API.OTHER_HOBBY}/${params.no}/hobby`);
      setOtherPeopleHobby(res.data.result.hobby);
    } catch (error) {
      alert('검색 오류입니다');
    }
  };

  return (
    <MyPageWrap>
      <PageTitle>취미</PageTitle>
      <ContentsWrap>
        <ContentsTitle>취미</ContentsTitle>
        <Content>{hobby}</Content>
      </ContentsWrap>
      <ContentsWrap>
        <ContentsTitle>다른 사람들의 취미</ContentsTitle>
        <Input
          onChange={onChange}
          name="no"
          placeholder={'사용자 번호'}
          type={'number'}
        />
        <Button onClick={onSearchClick}>검색</Button>
        <Content>{otherPeopleHobby}</Content>
      </ContentsWrap>
    </MyPageWrap>
  );
};

export default HobbyPage;
