import cn from "@/utils/classNames";
import styles from "./Title.module.css";

interface Props {
  title: string;
  className?: string;
  topLeft?: boolean;
  size?: "small" | "medium" | "large";
}

const Title = ({ title, className, topLeft, size }: Props) => {
  return (
    <div
      className={cn(
        "w-fit px-2",
        topLeft ? "skew-y-3 skew-x-6" : "-skew-y-6 skew-x-3",
        className,
        styles[`${size}`],
        styles.titleWrapper
      )}
    >
      <p className={cn("text-center font-semibold", styles.title)}>{title}</p>
    </div>
  );
};

export default Title;
