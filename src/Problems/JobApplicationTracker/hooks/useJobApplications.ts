import { useReducer } from "react";
import { JobApplication } from "../type";

const initialState = [
  {
    id: "application-1",
    companyName: "Apollo.io",
    status: "Technical Round" as const,
    position: "Senior Frontend Developer",
  },
  {
    id: "application-1",
    companyName: "Atlassian",
    status: "Technical Round" as const,
    position: "Junio Frontend Developer",
  },
];

type Action =
  | { type: "ADD_APPLICATION"; payload: JobApplication }
  | { type: "UPDATE_APPLICATION"; payload: JobApplication }
  | { type: "DELETE_APPLICATION"; payload: string };

const reducer = (state: JobApplication[], action: Action): JobApplication[] => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_APPLICATION": {
      const updatedState = [...state];
      updatedState.push(payload);
      return updatedState;
    }
    case "UPDATE_APPLICATION": {
      const updatedState = [...state];
      const { id } = payload;
      const indexOf = updatedState.findIndex((app) => app.id === id);
      if (indexOf > 0) updatedState[indexOf] = payload;
      return updatedState;
    }
    case "DELETE_APPLICATION": {
      const updatedState = [...state];
      console.log({ payload });
      const indexOf = updatedState.findIndex((app) => app.id === payload);
      updatedState.splice(indexOf, 1);
      return updatedState;
    }
    default:
      return state;
  }
};

const useJobApplications = () => {
  const [jobApplications, dispatch] = useReducer(reducer, initialState);

  const onAddApplication = (payload: JobApplication) => {
    dispatch({ type: "ADD_APPLICATION", payload });
  };

  const onUpdateApplication = (payload: JobApplication) => {
    dispatch({ type: "UPDATE_APPLICATION", payload });
  };

  const onDeleteApplication = (id: string) => {
    dispatch({ type: "DELETE_APPLICATION", payload: id });
  };

  return {
    jobApplications,
    onAddApplication,
    onUpdateApplication,
    onDeleteApplication,
  };
};
export { useJobApplications };
