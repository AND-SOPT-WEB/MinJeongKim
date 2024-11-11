import styled from '@emotion/styled';
import React, { useState } from 'react';
import Input from '../../components/Input';

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
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
