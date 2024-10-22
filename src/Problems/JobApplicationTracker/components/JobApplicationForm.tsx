import React, { useState } from "react";
import { Input } from "./Input";
import { Select } from "./Select";
import { JobApplication } from "../type";

type Props = {
  visible: boolean;
  onAddApplication: (value: JobApplication) => void;
};

type Value = {
  value: string;
  error: string | null;
};

type JobApplicationForm = {
  companyName: Value;
  status: Value;
  position: Value;
  notes: Value;
};

const initialFormState = {
  companyName: {
    value: "",
    error: null,
  },
  status: {
    value: "",
    error: null,
  },
  position: {
    value: "",
    error: null,
  },
  notes: {
    value: "",
    error: null,
  },
};

const JobApplicationForm = (props: Props) => {
  const { visible, onAddApplication } = props;
  const [formState, setFormState] =
    useState<JobApplicationForm>(initialFormState);

  const handleChange = (id: string, value: string) => {
    const getFromState = (state: JobApplicationForm) => {
      const updatedState: JobApplicationForm = { ...state };
      const key = id as keyof JobApplicationForm;
      if (key in updatedState) {
        updatedState[key] = { ...updatedState[key], value };
      }
      return updatedState;
    };
    setFormState(getFromState);
  };

  const handleSubmit = () => {
    let error = false;
    const values = Object.entries(formState).reduce(
      (accumalator, [key, value]) => {
        if (value.error) {
          error = true;
        }
        accumalator[key] = value.value;
        return accumalator;
      },
      {} as JobApplication
    );
    if (!error) {
      onAddApplication({ ...values, id: Date.now().toString() });
      setFormState(initialFormState);
    }
  };

  if (!visible) return <div className="form-container"></div>;
  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        label={"Company Name"}
        onChange={handleChange}
        id={"companyName"}
        value={formState?.companyName.value}
        error={formState?.companyName.error}
      />
      <Input
        label={"Position"}
        onChange={handleChange}
        id={"position"}
        value={formState?.position.value}
        error={formState?.position.error}
      />
      <Select
        label={"Status"}
        onChange={handleChange}
        id={"status"}
        value={formState?.status.value}
        error={formState?.status.error}
      />
      <button>Add Application</button>
    </form>
  );
};
export { JobApplicationForm };
