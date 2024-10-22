import { ChangeEvent } from "react";

type Props = {
  label: string;
  value?: string | undefined;
  onChange: (id: string, value: string) => void;
  error?: string | null;
  id: string;
};

const Input = (props: Props) => {
  const { label, value, onChange, id, error } = props;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(id, value);
  };

  return (
    <label htmlFor={id}>
      {label}
      <br />
      <input type="text" id={id} onChange={handleChange} value={value} />
      <p>{error}</p>
    </label>
  );
};
export { Input };
