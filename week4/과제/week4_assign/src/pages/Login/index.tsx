import styled from '@emotion/styled';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { PATH } from '../../routes/path.tsx';

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginContainer = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PageLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.gray};
`;

const Login = () => {
  const [params, setParams] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

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
