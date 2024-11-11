// utils/validation.ts
export const validateName = (name: string) => {
  if (name.length > 8) {
    return '이름은 8자 이하로 입력해주세요.';
  }
  return '';
};

export const validatePassword = (password: string, passwordCheck: string) => {
  if (password !== passwordCheck) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const validateHobby = (hobby: string) => {
  if (hobby.length > 8) {
    return '취미는 8자 이하로 입력해주세요.';
  }
  return '';
};
