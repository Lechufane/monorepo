import { useRouter } from "next/router";
import Img from "@/components//Img";
import Title from "@/components/Title";
import styles from "./CardBlog.module.css";
import cn from "@/utils/classNames";
import ProfileLogo from "../ProfileLogo/ProfileLogo";

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
  image,
  content,
  hasProfile,
}: Props) => {
  const router = useRouter();

  return (
    <div
      key={id}
      className={cn(
        "relative w-full flex items-center m-2 rounded-md cursor-pointer",
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
        <>
          <div className="h-40 flex flex-col items-center justify-between">
            <ProfileLogo title={authorUsername} size="medium" />
          </div>
        </>
      )}

      <div className="flex-coll justify-between w-full overflow-hidden m-2 p-4 z-20">
        <div className="flex justify-between w-full items-center gap-2">
          <Title title={title} className={cn("bg-red-500")} size="small" />
        </div>
        <div className="flex flex-col w-full justify-around items-end gap-2">
          <p className={cn("text-white text-sm p-8", styles.contentText)}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
