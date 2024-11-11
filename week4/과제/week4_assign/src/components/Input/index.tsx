import styled from '@emotion/styled';
import React, { useState } from 'react';

const InputWrap = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
`;

interface props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  type: string;
}

/**
 * @description input 컴포넌트
 * @param onChange input 값 변경 시 실행되는 함수
 * @param name  input name
 * @param placeholder
 * @param type input 타입
 */

const Input = ({ onChange, name, placeholder, type }: props) => {
  return (
    <InputWrap
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
