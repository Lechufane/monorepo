import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import useResponsive from '@/hooks/useResponsive';
import Img from '@/components/Img';
import cn from '@/utils/classNames';
import calendar from '@/public/assets/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './InputDate.module.css';

/** Styled reusable form's Input component. */
const InputDate = ({
  id,
  value,
  handleChange,
  size,
  className,
  name,
  errorMessage,
  placeholder,
  icon,
  disabled,
  ...props
}) => {
  const { isMobile } = useResponsive();

  const getFormattedValue = (value) => {
    const date = value && typeof value === 'string' ? new Date(value) : value; // Convert from ISO string to Date object.
    if (date && date?.getTime() < 0) return null; // If date is invalid, return no date (null).
    return date;
  };

  return (
    <>
      <label
        className={cn(
          styles.input,
          styles[size],
          disabled ? styles.disabled : '',
          className,
          'relative flex justify-between items-center'
        )}
      >
        <DatePicker
          className={styles.datePicker}
          fixedHeight
          key={id}
          name={name}
          selected={getFormattedValue(value)}
          onChange={(date) => {
            handleChange({ target: { name, value: date } });
          }}
          onFocus={(e) => (e.target.readOnly = isMobile)} // Prevent keyboard from opening on mobile.
          dateFormat={'dd/MM/yyyy'}
          placeholderText={placeholder}
          showYearDropdown
          disabled={disabled}
          {...props}
        />
        <Img src={icon || calendar} className="absolute right-0 w-5 mx-2" />
      </label>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};
InputDate.propTypes = {
  id: PropTypes.number,
  value: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

InputDate.defaultProps = {
  id: 0,
  value: null,
  size: '',
  className: '',
  placeholder: '',
  errorMessage: '',
  label: '',
  minDate: null,
  maxDate: null,
};

export default InputDate;
