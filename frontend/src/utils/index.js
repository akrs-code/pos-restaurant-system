export const getRandomBG = () => {
  const colors = ["#FF6B6B", "#FFA500", "#FFE066", "#4CAF50"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getBgColor = () => {
  const bgarr = ["#b73e3e", "#5b45b0", "#735f32", "#1d2569", "#284350"];
  const randomBg = Math.floor(Math.random() * bgarr.length); 
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map(word => word[0]?.toUpperCase())
    .join("");
};

export const formatDate = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
  };