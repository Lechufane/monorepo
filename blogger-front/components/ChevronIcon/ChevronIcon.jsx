import PropTypes from 'prop-types';
import cn from '../../utils/classNames';
import styles from './ChevronIcon.module.css';

const ChevronIcon = ({
  type,
  className,
  size,
  onClick,
  color,
  thickness = 2,
}) => {
  return (
    <i
      className={cn(styles.container, styles[type], styles[size], className)}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12" fill="none">
        <path
          d="M18 2L10 10L2 2"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </i>
  );
};

ChevronIcon.propTypes = {
  color: PropTypes.string,
  type: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  thickness: PropTypes.number,
};

ChevronIcon.defaultProps = {
  thickness: 2,
  color: 'var(--main-color)',
  size: 'small',
  type: 'up',
  className: '',
  onClick: () => {},
};

export default ChevronIcon;
