import PropTypes from 'prop-types';
import styles from './Loading.module.css';
import cn from '@/utils/classNames';

const Loading = ({ className, show }) => {
  return (
    show && (
      <div
        className={cn(
          styles.container,
          className,
          'bg-background flex justify-center items-center w-full h-[70vh]'
        )}
      >
        <div className={cn(styles.spinner)}></div>
      </div>
    )
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
};

export default Loading;
