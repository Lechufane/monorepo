import PropTypes from "prop-types";
import cn from "@/utils/classNames";
import styles from "./Input.module.css";

interface Props {
  type: "text" | "password" | "email" | "number" | "textarea";
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  errorMessage?: string;
  size?: "small" | "medium" | "large";
  name: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
}

/** Styled reusable form's Input component. */
const Input = ({
  type,
  value,
  handleChange,
  className,
  label,
  errorMessage,
  name,
  maxLength,
  size,
  ...props
}: Props) => {
  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <div className={cn(styles.container)}>
        {type === "textarea" ? (
          <textarea
            name={name}
            className={cn(styles.input, className)}
            onChange={(e: any) => handleChange(e)}
            maxLength={maxLength}
            value={value}
            {...props}
          />
        ) : (
          <input
            name={name}
            className={cn(styles.input, className)}
            onChange={(e) => handleChange(e)}
            maxLength={maxLength}
            value={value}
            {...props}
          />
        )}
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

Input.defaultProps = {
  handleChange: () => {},
  errorMessage: "",
  label: "",
  size: "large",
  type: "text",
  className: "",
  maxLength: null,
};

Input.propTypes = {
  handleChange: PropTypes.func,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["text", "password", "email", "number"]),
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

export default Input;
