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

document.addEventListener("DOMContentLoaded", () => {
  displayMembers(JSON.parse(localStorage.getItem("membersData")));
});


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

document.querySelector(".search-button").addEventListener("click", (e) => {
  filterMembers();
});



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

document.querySelector(".reset-button").addEventListener("click", resetFilter);


/*
  @description
    - 전체 선택 체크박스
 */

// document.getElementById(".selectAll").addEventListener("click", (e) => {
//
//
// });


/*
  @description
    - 체크된 멤버 삭제
 */
const deleteMembers = () => {
  const membersData = JSON.parse(localStorage.getItem("membersData"));
  const checkedMembers = document.querySelectorAll(".member-checkbox:checked");
  console.log(checkedMembers);
  checkedMembers.forEach((member) => {
    const index = member.parentElement.parentElement.rowIndex - 1;
    membersData.splice(index, 1);
  })
  localStorage.setItem("membersData", JSON.stringify(membersData));
  displayMembers(membersData);
}

document.querySelector(".delete-button").addEventListener("click", deleteMembers);

/*
  @description
    - 모달 관련
 */

const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-button");
const addSubmit = document.querySelector(".add-submit");

const onModalOpen = () => {
  modal.style.display = "block";
}

const onModalClose = () => {
  modal.style.display = "none";
}

const onModalAddItem = () => {
  const name = document.getElementById("add_name")?.value;
  const englishName = document.getElementById("add_english-name")?.value;
  const github = document.getElementById("add_github")?.value;
  const gender = document.getElementById("add_gender")?.value;
  const role = document.getElementById("add_role")?.value;
  const firstWeekGroup = document.getElementById("add_firstWeekGroup")?.value;
  const secondWeekGroup = document.getElementById("add_secondWeekGroup")?.value;
  const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
  membersData.push({
    name,
    englishName,
    github,
    gender,
    role,
    firstWeekGroup,
    secondWeekGroup,
  });
  localStorage.setItem("membersData", JSON.stringify(membersData));
  displayMembers(membersData);
  onModalClose();
}

openModal.addEventListener("click", onModalOpen);
closeModal.addEventListener("click", onModalClose);
addSubmit.addEventListener("click", onModalAddItem);
