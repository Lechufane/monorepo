import React from "react";
import PropTypes from "prop-types";
import cn from "@/utils/classNames";
import styles from "./InputTextArea.module.css";

interface Props {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  label?: string;
  errorMessage?: string;
  size?: "small" | "medium" | "large";
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
}

const InputTextArea = ({
  name,
  value,
  handleChange,
  className,
  label,
  errorMessage,
  size = "medium",
  maxLength,
  ...props
}: Props) => {
  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div className={cn(styles.container, styles[size])}>
        <textarea
          className={cn(styles.input, className)}
          value={value}
          name={name}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span className={styles.counter}>{`${
            value?.length || 0
          } / ${maxLength}`}</span>
        )}
      </div>

      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};

InputTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  maxLength: PropTypes.number,
};

InputTextArea.defaultProps = {
  className: "",
  label: "",
  errorMessage: "",
  size: "large",
  maxLength: null,
};

export default InputTextArea;
