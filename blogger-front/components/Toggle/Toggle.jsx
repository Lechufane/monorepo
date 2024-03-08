import PropTypes from "prop-types";
import cn from "@/utils/classNames";
import styles from "./Toggle.module.css";

/** Stateless toggle component with label.
 * It accepts handleChange or toggleActive callbacks to update parent state.
 * At least one of them must be passed as props for proper behaviour.
 *
 * handleChange is called with an event with name and value fields.
 * toggleActive is called with no params if no handleChange callback is provided.
 */
const Toggle = ({
  name,
  label,
  active,
  disabled,
  handleChange,
  toggleActive,
}) => {
  /** Updates state only if toggle is not disabled. */
  const handleClick = () => {
    if (!disabled) {
      // handleChange is called with an event with name and value fields.
      // toggleActive is called with no params if no handleChange callback is provided.
      if (handleChange) handleChange({ target: { name, value: !active } });
      else toggleActive();
    }
  };

  return (
    <div
      className={cn(
        styles.container,
        active ? styles.active : styles.inactive,
        disabled ? styles.disabled : ""
      )}
    >
      <div className={styles.toggle} onClick={handleClick}>
        <div className={styles.circle}></div>
      </div>
      {label}
    </div>
  );
};

Toggle.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  handleChange: PropTypes.func,
  toggleActive: PropTypes.func,
};

Toggle.propTypes = {
  name: "",
  label: "",
  disabled: false,
  active: false,
  handleChange: null,
  toggleActive: () => {},
};

export default Toggle;
