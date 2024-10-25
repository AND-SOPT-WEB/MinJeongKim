import {members} from "../config/members.js";

if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
}

/*
  @description
    - membersData를 가져와서 테이블에 출력
 */
const displayMembers = (membersData) => {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  membersData.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox" class="member-checkbox"></td>
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

/*
  @description
    - 입력된 값에 따라 필터링된 결과를 테이블에 출력
 */
const filterMembers = () => {
  const nameFilter = document.getElementById("name").value;
  const englishNameFilter = document.getElementById("english-name").value.toLowerCase();
  const githubFilter = document.getElementById("github").value.toLowerCase();
  const genderFilter = document.getElementById("gender").value;
  const roleFilter = document.getElementById("role").value;
  const firstWeekGroupFilter = document.getElementById("firstWeekGroup").value;
  const secondWeekGroupFilter = document.getElementById("secondWeekGroup").value;


  const membersData = JSON.parse(localStorage.getItem("membersData"));

  const filteredData = membersData.filter(member => {
    return (
      (!nameFilter || member.name.includes(nameFilter)) &&
      (!englishNameFilter || member.englishName.toLowerCase().includes(englishNameFilter)) &&
      (!githubFilter || member.github.includes(githubFilter)) &&
      ( genderFilter === "all" || member.gender === genderFilter) &&
      ( roleFilter ==="all" || member.role === roleFilter) &&
      (!firstWeekGroupFilter || member.firstWeekGroup.toString() === firstWeekGroupFilter) &&
      (!secondWeekGroupFilter || member.secondWeekGroup.toString() === secondWeekGroupFilter)
    );
  });
  displayMembers(filteredData);
};

/*
  @description
    - 필터링된 결과 초기화, 전체 데이터 테이블 출력
 */
const resetFilter = () => {
  document.getElementById("name").value = "";
  document.getElementById("english-name").value = "";
  document.getElementById("github").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("role").value = "";
  document.getElementById("firstWeekGroup").value = "";
  document.getElementById("secondWeekGroup").value = "";

  displayMembers(JSON.parse(localStorage.getItem("membersData")));
}


document.addEventListener("DOMContentLoaded", () => {
  displayMembers(JSON.parse(localStorage.getItem("membersData")));
});

document.querySelector(".search-button").addEventListener("click", (e) => {
  filterMembers();
});

document.querySelector(".reset-button").addEventListener("click", resetFilter);
