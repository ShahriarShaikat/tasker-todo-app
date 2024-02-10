export default function getPriorityColor(priority) {
  //bg-amber-400
  //bg-cyan-500
  //bg-purple-700
  let color = "";
  if (priority == "High") {
    color = "bg-orange-400 border-orange-800";
  } else if (priority == "Medium") {
    color = "bg-cyan-500 border-cyan-700";
  } else {
    color = "bg-purple-700 border-purple-900";
  }

  return color;
}
