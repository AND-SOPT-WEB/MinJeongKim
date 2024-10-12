const input = document.querySelector('input');
const add = document.querySelector('.add-Btn');
const todolst = document.querySelector('.todo-lst');

const addBtnClick = function() {
  const li = document.createElement('li');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.addEventListener('click', function() {
    todolst.removeChild(li);
  });

  li.textContent = input.value;
  li.appendChild(deleteBtn);
  todolst.appendChild(li);
  input.value = '';
}


add.addEventListener('click', addBtnClick);