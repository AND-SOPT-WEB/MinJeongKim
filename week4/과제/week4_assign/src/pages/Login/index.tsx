import styled from '@emotion/styled';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { PATH } from '../../routes/path.tsx';
import { useParams } from '../../hooks/useParams.ts';

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginContainer = styled.div`
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

const PageLink = styled(Link)`
  display: block;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const Login = () => {
  const { params, handleChange } = useParams({
    id: '',
    password: '',
  });

  const handleLogin = () => {
    // 로그인 요청
  };

  return (
    <LoginPage>
      <LoginContainer>
        <PageTitle>로그인</PageTitle>
        <Input
          onChange={handleChange}
          name="id"
          placeholder="아이디"
          type="text"
        />
        <Input
          onChange={handleChange}
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <Button onClick={handleLogin}>로그인</Button>
        <PageLink to={PATH.Signup}>회원가입</PageLink>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
