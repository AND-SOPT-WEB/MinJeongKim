import styled from '@emotion/styled';
import Button from '../../components/Button';
import React, { useState } from 'react';
import Input from '../../components/Input';
import { useParams } from '../../hooks/useParams.ts';
import { Link } from 'react-router-dom';

const SignupPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const SignupContainer = styled.div`
  width: 40rem;
  padding: 4rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PageTitle = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
`;

const ContentTitle = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
`;

const Subments = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
`;

const PageLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray};
`;

interface paramTypes {
  username: string;
  password: string;
  password_check: string;
  hobby: string;
}

interface errorTypes {
  nameError: string;
  passwordError: string;
  hobbyError: string;
}

const Signup = () => {
  const { params, handleChange } = useParams<paramTypes>({
    username: '',
    password: '',
    password_check: '',
    hobby: '',
  });
  const [error, setError] = useState<errorTypes>({
    nameError: '',
    passwordError: '',
    hobbyError: '',
  });

  const handleName = () => {
    // 이름 입력 후
  };
  const handlePassword = () => {
    // 비밀번호 입력 후
  };
  const handleHobby = () => {
    // 취미 입력 후
  };

  return (
    <SignupPage>
      <SignupContainer>
        <PageTitle>회원가입</PageTitle>
        <ContentTitle>이름</ContentTitle>
        <Input
          onChange={handleChange}
          name="username"
          placeholder="이름"
          type="text"
        />
        <Button onClick={handleName} disabled={params.username === ''}>
          다음
        </Button>
        <ContentTitle>비밀번호</ContentTitle>
        <Input
          onChange={handleChange}
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <Input
          onChange={handleChange}
          name="password_check"
          placeholder="비밀번호 확인"
          type="password"
        />
        <Button onClick={handlePassword}>다음</Button>
        <ContentTitle>취미</ContentTitle>
        <Input
          onChange={handleChange}
          name="hobby"
          placeholder="취미"
          type="text"
        />
        <Button onClick={handleHobby}>다음</Button>
        <Subments>
          이미 회원이신가요? <PageLink to="/">로그인</PageLink>
        </Subments>
      </SignupContainer>
    </SignupPage>
  );
};

export default Signup;
