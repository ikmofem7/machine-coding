import { ChangeEvent } from "react";

type Props = {
  label: string;
  value?: string | undefined;
  onChange: (id: string, value: string) => void;
  error?: string | null;
  id: string;
};

const options = [
  { label: "Applied", value: "Applied" },
  { label: "Interview Scheduled", value: "Interview Scheduled" },
  { label: "Technical Round", value: "Technical Round" },
  { label: "HR Round", value: "HR Round" },
  { label: "Offered", value: "Offered" },
  { label: "Rejected", value: "Rejected" },
];

const Select = (props: Props) => {
  const { label, value, onChange, id, error } = props;
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(id, value);
  };

  return (
    <label htmlFor={id}>
      {label}
      <br />
      <select id={id} onChange={handleChange} value={value}>
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
      <p>{error}</p>
    </label>
  );
};
export { Select };
