export default function getRandomColor() {
  // Generate random values for RGB
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Combine RGB values into a CSS color string
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}
