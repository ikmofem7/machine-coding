import { useMemo, useState } from "react";
import { JobApplicationForm } from "./components";
import { useJobApplications } from "./hooks";
import "./styles.css";
import { Select } from "./components/Select";
import { JobApplication } from "./type";
import { Input } from "./components/Input";

const JobApplicationTracker = () => {
  const {
    jobApplications,
    onAddApplication,
    onUpdateApplication,
    onDeleteApplication,
  } = useJobApplications();
  const [isFormVisible, setFormVisible] = useState<boolean>(true);
  const [filterApplication, setFilterApplication] = useState<string>("");

  const handleAddApplication = () => {
    setFormVisible(true);
  };

  const handleChangeStatus =
    (application: JobApplication) => (_: string, value: string) => {
      const payload = { ...application, status: value } as JobApplication;
      onUpdateApplication(payload);
    };

  const handleFilterChange = (_: string, value: string) => {
    setFilterApplication(value);
  };

  const filteredApplication = useMemo(() => {
    const value = filterApplication.toLowerCase();
    return jobApplications.filter(
      (application) =>
        application.companyName.toLowerCase().includes(value) ||
        application.position.toLowerCase().includes(value)
    );
  }, [filterApplication, jobApplications]);

  return (
    <div className="job-application-container">
      <h2>Job Application Tracker</h2>
      <div className="container">
        <div className="list-container">
          <div>
            <Input
              label={"Filter"}
              onChange={handleFilterChange}
              id={"filter"}
            />
            <button onClick={handleAddApplication}>Add Application</button>
          </div>
          <ul>
            {filteredApplication.map((application) => {
              const { id, position, status, companyName } = application;
              return (
                <li key={id}>
                  Position:{position}
                  <br />
                  Company Name: {companyName}
                  <Select
                    label={""}
                    onChange={handleChangeStatus(application)}
                    id={id}
                    value={status}
                  />
                  <button onClick={() => onDeleteApplication(id)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <JobApplicationForm
          visible={isFormVisible}
          onAddApplication={onAddApplication}
        />
      </div>
    </div>
  );
};

export { JobApplicationTracker };
