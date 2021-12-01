import VInput from "components/form/VInput";
import { ValidationName } from "helper/useValidator";
import { useState } from "react";

const Validation: React.FC = () => {
  const [input, setInput] = useState({
    value: "",
    onBlur: false,
    ruleNames: [ValidationName.Required],
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
