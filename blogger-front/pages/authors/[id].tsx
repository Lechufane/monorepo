import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileLogo from "@/components/ProfileLogo/ProfileLogo";
import AuthorsService from "@/services/AuthorsService";
import logger from "@/utils/logger";
import cn from "@/utils/classNames";
import dragonLogo from "@/public/assets/dragon-badge.svg";
import styles from "@/styles/Authors.module.css";
import Img from "@/components/Img";
import CardBlog from "@/components/CardBlog/CardBlog";
import HeaderBack from "@/components/HeaderBack/HeaderBack";

interface Author {
  id: number;
  username: string;
  name: string;
  email: string;
  blogs: Blog[];
}

interface Blog {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorUsername: string;
  authorEmail: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const SingleAuthor: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchAuthor = async () => {
    const { ok, data } = await AuthorsService.getAuthor(id);
    if (!ok) {
      logger.error("Failed to fetch author");
      return;
    }
    setAuthor(data);
    logger.debug("Fetched author", data);
  };

  useEffect(() => {
    fetchAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [author, setAuthor] = useState<Author>({
    id: 0,
    username: "",
    name: "",
    email: "",
    blogs: [],
  });

  return (
    <div className="flex flex-col h-screen w-full px-4 py-8 min-w-[500px]">
      <div className="sticky">
        <HeaderBack />
        <div className="w-full flex flex-col items-center justify-center">
          <ProfileLogo title={author.username} size="large" className="" />
        </div>
        <div className="w-full">
          <div className="flex justify-between w-full max-w-[850px] mx-auto gap-4 border-2 border-white">
            <div className="flex flex-col items-start justify-center p-4  rounded-md">
              <h2
                className={cn(
                  "text-3xl font-bold text-center mb-4",
                  styles.title
                )}
              >
                Adventure Badge
              </h2>
              <p className={cn("font-semibold", styles.text)}>
                Name: {author.name}
              </p>
              <p className={cn("font-semibold", styles.text)}>
                Email: {author.email}
              </p>
              <p className={cn("font-semibold", styles.text)}>
                Adventures shared: {author.blogs.length}
              </p>
            </div>
            <div>
              <Img
                src={dragonLogo}
                alt="Dragon Badge"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-2 mx-auto max-w-[920px]">
        {author.blogs.map(
          ({
            id,
            title,
            content,
            authorUsername,
            authorEmail,
            authorName,
            image,
          }) => (
            <CardBlog
              key={id}
              id={id}
              title={title}
              content={content}
              authorUsername={authorUsername}
              authorEmail={authorEmail}
              authorName={authorName}
              image={image}
              hasProfile={false}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SingleAuthor;
