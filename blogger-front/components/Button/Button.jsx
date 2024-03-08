import PropTypes from 'prop-types';
import cn from '../../utils/classNames';
import styles from './Button.module.css';

const Button = ({
  handleClick,
  label,
  size = null,
  className,
  secondary,
  disabled = false,
  loading,
  children,
  ...props
}) => {
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
        'text-[1.25rem] font-semibold px-2',
        className
      )}
      onClick={loading ? () => {} : handleClick}
      {...props}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div className={cn(styles.spinner, 'text-center')}></div>
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
  size: PropTypes.oneOf(['fit', 'small', 'medium', 'large', 'xLarge']),
  bodyType: PropTypes.oneOf(['slim']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  handleClick: () => {},
  className: '',
  label: '',
  size: 'medium',
  disabled: false,
  secondary: false,
  children: null,
};

export default Button;
