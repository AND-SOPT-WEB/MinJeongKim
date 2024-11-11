import React from 'react';
import styled from '@emotion/styled';

const ButtonWrap = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  margin: 5px 0;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_dark};
  }
`;

interface props {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ children, onClick }: props) => {
  return <ButtonWrap onClick={onClick}>{children}</ButtonWrap>;
};

export default Button;
