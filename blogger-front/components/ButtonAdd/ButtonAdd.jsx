import cn from '@/utils/classNames';
import ButtonSegment from '../ButtonSegment';

const ButtonAdd = ({ onClick, className, disabled, label }) => {
  return (
    <button
      onClick={onClick}
      className={cn('flex items-center gap-[0.2rem]', className)}
    >
      <ButtonSegment disabled={disabled} className={'self-center'} />{' '}
      <span
        className={cn(
          disabled ? 'text-disabled' : 'text-main',
          'text-[1.125rem] font-semibold'
        )}
      >
        {label}
      </span>
    </button>
  );
};

export default ButtonAdd;
