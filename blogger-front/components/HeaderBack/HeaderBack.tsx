import Img from "@/components/Img";
import { useRouter } from "next/router";
import arrowBack from "@/public/assets/arrow-back.svg";
import styles from "./HeaderBack.module.css";
import cn from "@/utils/classNames";

interface Props {
  text?: string;
}

const HeaderBack = ({ text }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "sticky top-5 z-50 cursor-pointer flex justify-start gap-3",
        styles.text
      )}
      onClick={handleClick}
    >
      <Img
        src={arrowBack}
        alt="back"
        width={40}
        height={40}
        className="cursor-pointer"
      />
      <p className="text-white text-3xl self-start">{text}</p>
    </div>
  );
};

export default HeaderBack;