import VInput, { ValidationName } from "components/form/VInput";
import { useState } from "react";

const Validation: React.FC = () => {
  const [input, setInput] = useState({
    value: "",
    onBlur: false,
    // rules: [ValidationName.Required, ValidationName.PhoneNumber],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, value: event.target.value });
  };
  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, onBlur: true });
  };

  return (
    <div>
      <VInput
        value={input}
        onChange={handleChange}
        onBlur={handleBlur}
        // helperText="hoho"
      />
    </div>
  );
};
export default Validation;
