import { members } from "../config/members.js";

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
      <td><input type="checkbox" class="member-checkbox" data-id=${member.id}></td>
      <td>${member.name}</td>
      <td>${member.englishName}</td>
      <td><a href="https://github.com/${member.github}">${member.github}</a></td>
      <td>${member.gender === "male" ? "남성" : "여성"}</td>
      <td>${member.role}</td>
      <td>${member.firstWeekGroup}</td>
      <td>${member.secondWeekGroup}</td>
    `;
    tbody.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displayMembers(JSON.parse(localStorage.getItem("membersData")));
});

/*
  @description
    - 입력된 값에 따라 필터링된 결과를 테이블에 출력
 */

const searchButton = document.querySelector(".search-button");

const filterMembers = () => {
  const nameFilter = document.getElementById("name").value;
  const englishNameFilter = document
    .getElementById("english-name")
    .value.toLowerCase();
  const githubFilter = document.getElementById("github").value.toLowerCase();
  const genderFilter = document.getElementById("gender").value;
  const roleFilter = document.getElementById("role").value;
  const firstWeekGroupFilter = document.getElementById("firstWeekGroup").value;
  const secondWeekGroupFilter =
    document.getElementById("secondWeekGroup").value;

  const membersData = JSON.parse(localStorage.getItem("membersData"));

  const filteredData = membersData.filter((member) => {
    return (
      (!nameFilter || member.name.includes(nameFilter)) &&
      (!englishNameFilter ||
        member.englishName.toLowerCase().includes(englishNameFilter)) &&
      (!githubFilter || member.github.includes(githubFilter)) &&
      (genderFilter === "all" || member.gender === genderFilter) &&
      (roleFilter === "all" || member.role === roleFilter) &&
      (!firstWeekGroupFilter ||
        member.firstWeekGroup.toString() === firstWeekGroupFilter) &&
      (!secondWeekGroupFilter ||
        member.secondWeekGroup.toString() === secondWeekGroupFilter)
    );
  });
  displayMembers(filteredData);
};

searchButton.addEventListener("click", filterMembers);

/*
  @description
    - 필터링된 결과 초기화, 전체 데이터 테이블 출력
 */

const resetButton = document.querySelector(".reset-button");

const resetFilter = () => {
  document.getElementById("name").value = "";
  document.getElementById("english-name").value = "";
  document.getElementById("github").value = "";
  document.getElementById("gender").value = "all";
  document.getElementById("role").value = "all";
  document.getElementById("firstWeekGroup").value = "";
  document.getElementById("secondWeekGroup").value = "";

  displayMembers(JSON.parse(localStorage.getItem("membersData")));
};

resetButton.addEventListener("click", resetFilter);

/*
  @description
    - 전체 선택 체크박스
 */

const selectAll = document.getElementById("selectAll");

const checkAll = (e) => {
  const memberCheckboxes = document.querySelectorAll(".member-checkbox"); // 동적으로 가져오기
  memberCheckboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked;
  });
};

const updateSelectAll = () => {
  const memberCheckboxes = document.querySelectorAll(".member-checkbox"); // 동적으로 가져오기
  // noteList 를 배열로 변환, every 로 배열의 모든 요소가 true일 때만 true 반환
  const allChecked = Array.from(memberCheckboxes).every(
    (checkbox) => checkbox.checked,
  );
  const anyChecked = Array.from(memberCheckboxes).some(
    (checkbox) => checkbox.checked,
  );

  // 모든 체크박스가 체크되면 전체 선택 활성화, 모두 체크 해제되면 비활성화
  selectAll.checked = allChecked;
  // 일부만 체크된 경우 중간 상태
  selectAll.indeterminate = !allChecked && anyChecked;
};

selectAll.addEventListener("click", checkAll);
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("member-checkbox")) {
    updateSelectAll();
  }
});

/*
  @description
    - 체크된 멤버 삭제
 */

const deleteButton = document.querySelector(".delete-button");

const deleteMembers = () => {
  let membersData = JSON.parse(localStorage.getItem("membersData"));
  const checkedMembers = document.querySelectorAll(".member-checkbox:checked");
  const deleteMemId = Array.from(checkedMembers).map((member) => {
    return member.dataset.id;
  });
  membersData = membersData.filter(
    (member) => !deleteMemId.includes(member.id.toString()),
  );
  localStorage.setItem("membersData", JSON.stringify(membersData));
  displayMembers(membersData);
};

deleteButton.addEventListener("click", deleteMembers);

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
};

const onModalClose = () => {
  modal.style.display = "none";
};

const onModalAddItem = () => {
  const name = document.getElementById("add_name").value;
  const englishName = document.getElementById("add_english-name").value;
  const github = document.getElementById("add_github").value;
  const gender = document.getElementById("add_gender").value;
  const role = document.getElementById("add_role").value;
  const firstWeekGroup = document.getElementById("add_firstWeekGroup").value;
  const secondWeekGroup = document.getElementById("add_secondWeekGroup").value;
  const membersData = JSON.parse(localStorage.getItem("membersData")) || [];

  if (
    !name ||
    !englishName ||
    !github ||
    !gender ||
    !role ||
    !firstWeekGroup ||
    !secondWeekGroup
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

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
};

openModal.addEventListener("click", onModalOpen);
closeModal.addEventListener("click", onModalClose);
addSubmit.addEventListener("click", onModalAddItem);
// 백드롭 클릭 시 모달 닫기
modal.addEventListener("click", (e) => {
  if (e.target === modal) onModalClose();
});
