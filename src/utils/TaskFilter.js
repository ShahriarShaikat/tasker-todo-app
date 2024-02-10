export function getTaskByPriority(tasks, priority) {
  const highArr = [];
  const mediumArr = [];
  const lowArr = [];
  let transformarray = [];

  if (tasks.length > 0) {
    tasks.forEach((element) => {
      if (element.priority === "High") {
        highArr.push(element);
      } else if (element.priority === "Medium") {
        mediumArr.push(element);
      } else if (element.priority === "Low") {
        lowArr.push(element);
      }
    });
    if (priority === "low_to_high") {
      transformarray = [...lowArr, ...mediumArr, ...highArr];
    } else if (priority === "high_to_low") {
      transformarray = [...highArr, ...mediumArr, ...lowArr];
    }
  }

  return transformarray;
}

export function getTaskByFilter(tasks, filterkey) {
  return tasks.filter((task) => task.complete == filterkey);
}

export function getTaskBySearch(tasks, searchKey) {
  return tasks.filter((task) => {
    return task.title.toLowerCase().includes(searchKey.toLowerCase());
  });
}
