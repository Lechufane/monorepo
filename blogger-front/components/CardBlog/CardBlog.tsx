import cn from "@/utils/classNames";
import styles from "./CardBlog.module.css";

interface Props {
  id: number;
  title: string;
  authorUsername: string;
  authorEmail: string;
  authorName: string;
  content: string;
}

const CardBlog: React.FC<Props> = ({
  id,
  title,
  authorUsername,
  authorName,
  authorEmail,
  content,
}: Props) => {
  const randomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-gray-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      key={id}
      className={cn(
        "w-full flex itemss-center border-white border-2 m-2 rounded-md",
        styles.cardBlog
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 justify-center items-center mt-8",
          styles.profileBox
        )}
      >
        <div
          className={`${randomColor()} w-32 h-32 border-gray-200 border-2 rounded-full flex justify-center items-center`}
        >
          <p className="text-7xl font-semibold text-center">
            {authorUsername
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </p>
        </div>
        <p>{authorName}</p>
        <p>{authorEmail}</p>
      </div>

      <div className="w-full overflow-hidden m-2 p-4 flex-2">
        <div className="flex justify-between w-full items-center gap-2">
          <h2 className="text-normal font-semibold whitespace-nowrap overflow-hidden">
            {title}
          </h2>
          <p className="text-sm font-semibold text-gray-500 whitespace-nowrap">
            ...by {authorUsername}
          </p>
        </div>
        <p className="text-gray-500 text-sm max-h-32 h-[60px]">{content}</p>
      </div>
    </div>
  );
};

export default CardBlog;
