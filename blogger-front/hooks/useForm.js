import { useState } from "react";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import logger from "@/utils/logger";

/**
 * Contains all the logic related to a generic form. It includes form state,
 * functions to update it and a simple form JSX builder.
 * @param {object} initialForm - Object containing the initial form state data.
 * @param {function} validator - Function to validate the form fields. Receives form name and value
 * and must return an error message or an empty string.
 * @returns {object} form - Object containing the form state data.
 * @returns {function} setForm - Function to update the form state data.
 * @returns {function} handleChange - Function to handle the form state data.
 * @returns {function} formBuilder - Function to build the form.
 */

const useForm = (
  initialForm = {},
  validator = () => {},
  initialErrors = {}
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    logger.debug("useForm", "handleChange", { name, value });
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    const errorMessage = validator(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage || "" }));
  };

  const handleFieldChange = (name) => (value) => {
    handleChange({ target: { name, value } });
  };

  const formBuilder = (formFields = []) => {
    return formFields.map((input) => {
      switch (input.type) {
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
              handleChange={() => handleFieldChange(input.name)}
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
