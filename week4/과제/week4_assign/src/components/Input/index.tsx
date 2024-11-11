import styled from '@emotion/styled';
import React, { useState } from 'react';

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 5px 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px; /* 오른쪽 여백 추가 */
`;

const Icon = styled.i`
  font-size: 1.5rem;
  color: gray;
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Error = styled.div`
  font-size: 1.2rem;
  color: red;
  margin-top: 5px;
`;

interface props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  type: string;
  error?: string;
}

/**
 * @description input 컴포넌트
 * @param onChange input 값 변경 시 실행되는 함수
 * @param name  input name
 * @param placeholder
 * @param type input 타입
 */

const Input = ({ onChange, name, placeholder, type, error }: props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <InputWrap>
      <StyledInput
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {type === 'password' && (
        <Icon
          onClick={togglePasswordVisibility}
          className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
        />
      )}
      {error && <Error>{error}</Error>}
    </InputWrap>
  );
};

export default Input;
