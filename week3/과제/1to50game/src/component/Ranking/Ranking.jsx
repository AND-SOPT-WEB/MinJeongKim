import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const RankingWrap = styled.div`
  width: 80%;
  position: relative;
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ResetButton = styled.button`
  position: absolute;
  right: 2rem;
  top: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const TableHeader = styled.thead`
  background-color: ${(props) => props.theme.colors.tertiary};
  color: white;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
`;

const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
`;

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const savedRankings = JSON.parse(localStorage.getItem("rankings")) || [];
    setRankings(savedRankings);
  }, []);

  const handleReset = () => {
    localStorage.removeItem("rankings");
    setRankings([]);
  };

  return (
    <RankingWrap>
      <Header>
        <Title>랭킹</Title>
        <ResetButton onClick={handleReset}>초기화</ResetButton>
      </Header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>타임스탬프</TableHeaderCell>
            <TableHeaderCell>레벨</TableHeaderCell>
            <TableHeaderCell>플레이시간</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {rankings.map((ranking, index) => (
            <TableRow key={index}>
              <TableCell>{ranking.timestamp}</TableCell>
              <TableCell>{ranking.level}</TableCell>
              <TableCell>{ranking.playTime}초</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </RankingWrap>
  );
};

export default Ranking;
