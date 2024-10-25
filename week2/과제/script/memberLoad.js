
/*
  @description
    - membersData를 localStorage에 저장
    - membersData를 가져와서 테이블에 출력
 */

import {members} from "../config/members.js";

if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
}


const displayMembers = () => {
  const membersData = JSON.parse(localStorage.getItem("membersData"));
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  membersData.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.id}</td>
      <td>${member.name}</td>
      <td>${member.englishName}</td>
      <td><a href="https://github.com/${member.github}">${member.github}</a></td>
      <td>${member.gender === "male" ? "남성": "여성"}</td>
      <td>${member.role}</td>
      <td>${member.firstWeekGroup}</td>
      <td>${member.secondWeekGroup}</td>
    `;
    tbody.appendChild(row);
  });

}

document.addEventListener("DOMContentLoaded", displayMembers);