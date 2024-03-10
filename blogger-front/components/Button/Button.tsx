import PropTypes from "prop-types";
import cn from "../../utils/classNames";
import styles from "./Button.module.css";

interface Props {
  loading: boolean;
  handleClick: () => void;
  label?: string | null | undefined;
  size: "fit" | "small" | "medium" | "large" | "xLarge";
  bodyType: "slim";
  className: string;
  disabled: boolean;
  children?: React.ReactNode;
  secondary?: boolean;
  [key: string]: any;
}

const Button = ({
  handleClick,
  label,
  size = "medium",
  className,
  secondary,
  disabled = false,
  loading,
  children,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        styles.container,
        disabled
          ? styles.buttonDisabled
          : secondary
          ? styles.buttonSecondary
          : styles.buttonPrimary,
        styles[size],
        className
      )}
      onClick={loading ? () => {} : handleClick}
      {...props}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div className={cn(styles.spinner, "text-center")}></div>
        </div>
      ) : (
        label || children
      )}
    </button>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  size: PropTypes.oneOf(["fit", "small", "medium", "large", "xLarge"]),
  bodyType: PropTypes.oneOf(["slim"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  handleClick: () => {},
  className: "",
  label: "",
  size: "medium",
  disabled: false,
  secondary: false,
  children: null,
};

export default Button;
