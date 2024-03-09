import { useState } from "react";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import logger from "@/utils/logger";
import InputTextArea from "@/components/InputTextArea";

const useForm = (
  initialForm = {},
  validator = () => {},
  initialErrors = {}
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    const errorMessage = validator(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage || "" }));
  };

  const handleFieldChange = (name) => (value) => {
    logger.debug("name", name);
    logger.debug("value", value?.target);
    setForm({
      ...form,
      [name]: value?.target?.value || value,
    });
    const errorMessage = validator(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage || "" }));
  };

  const formBuilder = (formFields = []) => {
    return formFields.map((input) => {
      switch (input.type) {
        case "textarea":
          return (
            <InputTextArea
              key={input.id}
              type="textarea"
              placeholder={input.placeholder}
              className={input.className}
              value={form[input.value]}
              name={input.name}
              maxLength={input.maxLength}
              handleChange={handleChange}
              errorMessage={errors[input.name]}
            />
          );
        case "file":
          return (
            <InputFile
              key={input.name}
              type="file"
              size={input.size}
              placeholder={input.placeholder}
              className={input.className}
              required={input.required}
              disabled={input.disabled}
              value={form[input.name]}
              name={input.name}
              handleChange={handleFieldChange(input.name)}
              errorMessage={errors[input.name]}
              accept={input.accept}
              fileName={input.fileName}
              fallbackAssetsUrl={input.fallbackAssetsUrl}
            />
          );
        default:
          return (
            <Input
              key={input.id}
              placeholder={input.placeholder}
              className={input.className}
              value={form[input.value]}
              name={input.name}
              maxLength={input.maxLength}
              handleChange={handleChange}
              errorMessage={errors[input.name]}
            />
          );
      }
    });
  };

  return { form, setForm, handleChange, formBuilder, errors };
};

export default useForm;
