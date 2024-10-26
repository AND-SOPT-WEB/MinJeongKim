import React, { useState } from 'react'
import './App.css'
import CardComponent from "./component/CardComponent.jsx";
import { members } from "./config.js";
import styled from "@emotion/styled";

const AppWrap = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
`;

function App() {
  const memberList = members.map((member)=>{
    return <CardComponent name={member.name} englishName={member.englishName} github={member.github} />
  })
  console.log(members)

  return (
    <AppWrap>
      {memberList}
    </AppWrap>
  )
}

export default App
