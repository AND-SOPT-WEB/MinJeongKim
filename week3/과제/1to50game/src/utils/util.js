/**
 * @description 레벨 설정
 */
export const levelSet = {
  level1: { size: 3, max: 18 },
  level2: { size: 4, max: 32 },
  level3: { size: 5, max: 50 },
};

/**
 * @description 현재 시간 포맷팅
 */
export const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  const formattedHours = hours % 12 || 12;

  return `${year}. ${month}. ${day}. ${period} ${formattedHours}:${minutes}:${seconds}`;
};
