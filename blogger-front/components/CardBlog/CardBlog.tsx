import { useRouter } from "next/router";
import Img from "@/components//Img";
import Title from "@/components/Title";
import styles from "./CardBlog.module.css";
import cn from "@/utils/classNames";

interface Props {
  id: number;
  title: string;
  authorUsername: string;
  authorEmail: string;
  authorName: string;
  image: string;
  content: string;
  hasProfile: boolean;
}

const CardBlog: React.FC<Props> = ({
  id,
  title,
  authorUsername,
  authorName,
  authorEmail,
  image,
  content,
  hasProfile,
}: Props) => {
  const router = useRouter();

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
        "w-full flex items-center border-transparent border-2 m-2 rounded-md relative cursor-pointer",
        styles.cardBlog
      )}
      onClick={() => {
        router.push(`/blogs/${id}`);
      }}
    >
      <Img
        src={image}
        alt="blog"
        width={400}
        height={300}
        className="absolute w-full h-full z-10 object-cover rounded-md"
      />
      {hasProfile && (
        <div
          className={cn(
            "flex flex-col gap-2 justify-center items-center mt-8 z-20 min-w-[250px]",
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
          <p className="w-fit">{authorName}</p>
          <p className="text-sm ">{authorEmail}</p>
        </div>
      )}

      <div className="flex-coll justify-between w-full overflow-hidden m-2 p-4 z-20">
        <div className="flex justify-between w-full items-center gap-2">
          <Title title={title} className={cn("bg-red-500", styles.title)} />
        </div>
        <div className="flex flex-col w-full justify-around items-end gap-2">
          <p className={cn("text-white text-sm p-8", styles.contentText)}>
            {content}
          </p>
          {hasProfile && (
            <Title
              title={`...by ${authorUsername}`}
              className={cn("bg-red-500", styles.title)}
              topLeft
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
