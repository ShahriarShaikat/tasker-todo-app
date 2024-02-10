import updateLocalstorage from "../utils/updateLocalstorage";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "Task/Mount":
      return [...action.payload];
      break;

    case "Task/Add":
      const updatedTasks = [...state, action.payload];
      updateLocalstorage(updatedTasks);
      return updatedTasks;
      break;

    case "Task/Edit":
      const updatedEditTasks = state.map((x) => {
        if (x.id == action.payload.id) {
          return { ...action.payload };
        }
        return { ...x };
      });
      updateLocalstorage(updatedEditTasks);
      return updatedEditTasks;
      break;

    case "Task/Delete":
      const updatedDeleteTasks = state.filter((x) => x.id != action.payload);
      updateLocalstorage(updatedDeleteTasks);
      return updatedDeleteTasks;
      break;

    case "Task/Delete/All":
      updateLocalstorage([]);
      return [];
      break;

    case "Task/Handle/Complete":
      const updatedCompleteTask = state.map((x) => {
        if (x.id == action.payload) {
          return { ...x, complete: true };
        }
        return { ...x };
      });
      updateLocalstorage(updatedCompleteTask);
      return updatedCompleteTask;
      break;

    default:
      updateLocalstorage(state);
      return state;
  }
};
