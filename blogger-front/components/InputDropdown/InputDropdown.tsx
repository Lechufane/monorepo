import { useState } from "react";
import PropTypes from "prop-types";
import ChevronIcon from "@/components/ChevronIcon";
import Img from "next/image";
import Toggle from "@/components/Toggle";
import cn from "@/utils/classNames";
import styles from "./InputDropdown.module.css";

/**
 *
 * Dropdown component for forms that simulates a select input with custom options and icons
 *
 * @param {function} handleChange - function to handle the change of the input
 * @param {array} options - array of objects with the options to display
 * @param {string} value - value of the input
 * @param {string} defaultValue - default value of the input
 * @param {string} size - size of the input
 * @param {string} errorMessage - error message to display
 * @param {string} label - label to display
 * @param {string} placeholder - placeholder to display
 * @param {string} className - className to add to the input
 * @param {boolean} multiple - if the input is multiple
 * @param {array} customOptions - custom options to display
 * @returns {JSX.Element}
 */

interface Props {
  type?: string;
  handleChange: (e: any) => void;
  options: Array<{ label: string; value: string }>;
  value: string | string[];
  defaultValue?: string;
  size?: string;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
  customOptions?: Array<any>;
  disabled?: boolean;
  input?: any;
}

const Dropdown: React.FC<Props> = ({
  type,
  handleChange,
  options,
  value,
  size,
  className,
  multiple,
  customOptions,
  errorMessage,
  placeholder,
  input,
  disabled,
  ...props
}: Props): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const shownValue = options?.find((elem) => elem.value === value);

  const handleSelect = (event, newValue) => {
    if (multiple) {
      let newVal;
      if (value.findIndex((elem) => elem === newValue) === -1) {
        newVal = [...value, newValue];
      } else {
        newVal = structuredClone(value);
        const indexToDelete = newVal.findIndex((elem) => elem === newValue);
        newVal.splice(indexToDelete, 1);
      }
      handleChange({ target: { value: newVal, name: props.name } });
    } else {
      handleChange({ target: { value: newValue, name: props.name } });
      setShowOptions(false);
    }
    if (event) event.stopPropagation();
  };

  const shouldBeChecked = (option) => {
    if (multiple) {
      return value.findIndex((elem) => elem === option.value) !== -1;
    } else {
      return shownValue && shownValue.value === option.value;
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      const labelList = value.map(
        (elem) => options?.find((option) => elem === option.value).label
      );
      return labelList.join(", ");
    }
    return shownValue && shownValue.label;
  };

  return (
    <>
      <button
        className={cn(
          styles.input,
          "h-[2.5rem]",
          styles[size],
          className,
          styles[type],
          disabled ? styles.disabled : ""
        )}
        {...props}
        onClick={() => !disabled && setShowOptions(!showOptions)}
        onBlur={(e) => {
          !e.currentTarget.contains(e.relatedTarget) && setShowOptions(false);
        }}
        type="button"
      >
        <span className={cn(styles.value, !value ? styles.placeholder : "")}>
          {getDisplayValue() || placeholder}
        </span>
        {showOptions && (
          <div className={styles.optionsContainer}>
            {customOptions
              ? customOptions
              : options?.map((option, index) => {
                  const shouldOptionBeChecked = shouldBeChecked(option);
                  return (
                    <div
                      key={index}
                      className={styles.option}
                      onClick={(e) => handleSelect(e, option.value)}
                    >
                      {option.icon && (
                        <Img src={option.icon} alt={option.label} />
                      )}
                      {multiple ? (
                        <Toggle
                          label={option.label}
                          active={shouldOptionBeChecked}
                          toggleActive={() => handleSelect(null, option.value)}
                        />
                      ) : (
                        <label className="text-left cursor-pointer">
                          {option.label}
                        </label>
                      )}
                    </div>
                  );
                })}
          </div>
        )}
        <ChevronIcon
          type={cn(showOptions ? "up" : "down")}
          input={input}
          size="medium"
          className="place-self-auto"
          color={cn(
            disabled
              ? "var(--disabled-color)"
              : type === "main"
              ? "var(--main-color)"
              : "var(--input-color)"
          )}
        />
      </button>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};

Dropdown.defaultProps = {
  type: null,
  handleChange: () => {},
  defaultValue: "",
  size: "small",
  value: "",
  errorMessage: "",
  label: "",
  placeholder: "",
  className: "",
  multiple: false,
  customOptions: null,
  disabled: false,
};

Dropdown.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  value: PropTypes.any,
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  customOptions: PropTypes.array,
  disabled: PropTypes.bool,
};

export default Dropdown;
