const randomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-gray-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default randomColor;
