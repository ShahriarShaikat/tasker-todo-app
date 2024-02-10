export function getTaskCountDetails(tasks) {
  const taskDetails = {
    total: 0,
    incomplete: 0,
    complete: 0,
  };
  tasks.forEach((element) => {
    if (element.complete) {
      taskDetails.complete = taskDetails.complete + 1;
    } else {
      taskDetails.incomplete = taskDetails.incomplete + 1;
    }
    taskDetails.total = taskDetails.total + 1;
  });
  return taskDetails;
}
