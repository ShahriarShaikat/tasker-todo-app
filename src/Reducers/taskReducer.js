export const taskReducer = (state, action) => {
  switch (action.type) {
    case "Task/Add":
      return [...state, action.payload];
      break;
    case "Task/Edit":
      return state.map((x) => {
        if (x.id == action.payload.id) {
          return { ...action.payload };
        }
        return { ...x };
      });
      break;
    case "Task/Delete":
      return state.filter((x) => x.id != action.payload);

      break;
    case "Task/Delete/All":
      return [];

      break;
    case "Task/Handle/Complete":
      return state.map((x) => {
        if (x.id == action.payload) {
          return { ...x, complete: true };
        }
        return { ...x };
      });

      break;
    default:
      return state;
  }
};
