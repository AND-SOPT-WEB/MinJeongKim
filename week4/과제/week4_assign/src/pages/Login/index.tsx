import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Input from '../../components/atom/Input';
import Button from '../../components/atom/Button';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path.tsx';
import { useParams } from '../../hooks/useParams.ts';
import axios from '../../api/axios.ts';
import { PATH_API } from '../../api/path.ts';

const LoginPage = styled.div`
  background-color: #ecf4ff;
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
  const navigate = useNavigate();
  const { params, handleEventChange } = useParams({
    username: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate(PATH.Mypage);
    }
  }, []);

  const handleLogin = () => {
    // 로그인 요청
    axios
      .post(PATH_API.LOGIN, params)
      .then((res) => {
        if (res.data.result) {
          localStorage.setItem('accessToken', res.data.result.token);
          alert('로그인 성공');
          console.log(res.data.result.token);
          navigate(PATH.Mypage);
        } else if (res.data.code) {
          alert('로그인 실패');
        }
      })
      .catch((err) => {
        alert(`로그인 실패 ${err}`);
      });
  };

  return (
    <LoginPage>
      <LoginContainer>
        <PageTitle>로그인</PageTitle>
        <Input
          onChange={handleEventChange}
          name="username"
          placeholder="아이디"
          type="text"
        />
        <Input
          onChange={handleEventChange}
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <Button
          onClick={handleLogin}
          disabled={params.username === '' || params.password === ''}
        >
          로그인
        </Button>
        <PageLink to={PATH.Signup}>회원가입</PageLink>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
