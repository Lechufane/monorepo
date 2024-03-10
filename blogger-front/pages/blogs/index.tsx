import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardBlog from "@/components/CardBlog/CardBlog";
import Title from "@/components/Title/Title";
import Img from "@/components/Img";
import BlogsService from "@/services/BlogsService";
import logger from "@/utils/logger";
import randomColor from "@/utils/randomColor";
import cn from "@/utils/classNames";
import addBlog from "@/public/assets/add-blog.svg";
import styles from "@/styles/Blogs.module.css";

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

const Index: React.FC = () => {
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 0,
      title: "",
      content: "",
      authorName: "",
      authorUsername: "",
      authorEmail: "",
      image: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const fetchBlogs = async () => {
    const { ok, data } = await BlogsService.getBlogs();
    if (!ok) {
      logger.error("Failed to fetch blogs");
      return;
    }
    setBlogs(data);
    logger.debug("Fetched blogs", data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="h-screen w-full px-4 py-8">
      <div className="w-full p-8 h-40 flex items-center justify-center">
        <Title
          title="Find adventures"
          className={cn("bg-red-600 whitespace-nowrap")}
          topLeft
          size="large"
        />
      </div>
      <div className="flex flex-col items-center justify-center my-2 mx-auto max-w-[980px]">
        {blogs.map(
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
              hasProfile={true}
            />
          )
        )}
      </div>
      <div
        onClick={() => {
          router.push("/blogs/create");
        }}
        className={cn(
          "m-2 fixed top-0 right-0 rounded-full cursor-pointer z-30",
          randomColor(),
          styles.addBlogButton
        )}
      >
        <Img src={addBlog} alt="add blog" width={100} height={100} />
      </div>
    </div>
  );
};

export default Index;
