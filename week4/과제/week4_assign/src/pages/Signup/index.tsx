import styled from '@emotion/styled';
import Button from '../../components/atom/Button';
import React, { useEffect, useState } from 'react';
import Input from '../../components/atom/Input';
import { useParams } from '../../hooks/useParams.ts';
import { Link } from 'react-router-dom';
import {
  validateHobby,
  validateName,
  validatePassword,
} from '../../utils/validation.ts';
import axios from '../../api/axios.ts';
import { PATH_API } from '../../api/path.ts';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../routes/path.tsx';

const SignupPage = styled.div`
  background-color: #ecf4ff;
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

interface stepType {
  [key: string]: string;
}

export const stepList: stepType = {
  name: '이름',
  password: '비밀번호',
  hobby: '취미',
};

const Signup = () => {
  const { params, handleEventChange } = useParams<paramTypes>({
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
  const [step, setStep] = useState('name');
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e);
    const nameError = validateName(e.target.value);
    setError((prev) => ({ ...prev, nameError }));
  };
  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e);
    const nameError = validateHobby(e.target.value);
    setError((prev) => ({ ...prev, nameError }));
  };

  // 비밀번호 확인 유효성 검사만  useEffect로 처리
  useEffect(() => {
    const passwordError = validatePassword(
      params.password,
      params.password_check,
    );
    setError((prev) => ({ ...prev, passwordError }));
  }, [params.password, params.password_check]);

  const handleName = () => {
    // 이름 입력 후
    setStep('password');
  };
  const handlePassword = () => {
    // 비밀번호 입력 후
    setStep('hobby');
  };
  const handleHobby = () => {
    const requestParams = {
      username: params.username,
      password: params.password,
      hobby: params.hobby,
    };
    // 취미 입력 후
    axios
      .post(PATH_API.USER, requestParams)
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          const token = res.data.result.token;
          localStorage.setItem('accessToken', token);
          alert('회원가입 성공');
          navigate(PATH.Login);
        } else if (res.data.code) {
          alert('회원가입 실패');
        }
      })
      .catch((err) => {
        alert(`회원가입 실패 ${err}`);
      });
  };

  return (
    <SignupPage>
      <SignupContainer>
        <PageTitle>회원가입</PageTitle>
        <ContentTitle>{stepList[step]}</ContentTitle>
        {step === 'name' && (
          <>
            <Input
              onChange={handleNameChange}
              name="username"
              placeholder="이름"
              type="text"
              error={error.nameError}
            />
            <Button
              onClick={handleName}
              disabled={params.username === '' || !!error.nameError}
            >
              다음
            </Button>
          </>
        )}
        {step === 'password' && (
          <>
            <Input
              onChange={handleEventChange}
              name="password"
              placeholder="비밀번호"
              type="password"
            />
            <Input
              onChange={handleEventChange}
              name="password_check"
              placeholder="비밀번호 확인"
              type="password"
              error={error.passwordError}
            />
            <Button
              onClick={handlePassword}
              disabled={
                params.password === '' ||
                params.password_check === '' ||
                !!error.passwordError
              }
            >
              다음
            </Button>
          </>
        )}
        {step === 'hobby' && (
          <>
            <Input
              onChange={handleHobbyChange}
              name="hobby"
              placeholder="취미"
              type="text"
              error={error.hobbyError}
            />
            <Button
              onClick={handleHobby}
              disabled={params.hobby === '' || !!error.hobbyError}
            >
              다음
            </Button>
          </>
        )}
        <Subments>
          이미 회원이신가요? <PageLink to="/">로그인</PageLink>
        </Subments>
      </SignupContainer>
    </SignupPage>
  );
};

export default Signup;
