import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Title from "@/components/Title/Title";
import BlogsService from "@/services/BlogsService";
import cn from "@/utils/classNames";
import logger from "@/utils/logger";
import styles from "@/styles/Blogs.module.css";
import Img from "@/components/Img/Img";

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

const SingleBlog = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog>({
    id: 0,
    title: "",
    content: "",
    authorName: "",
    authorUsername: "",
    authorEmail: "",
    image: "",
    createdAt: "",
    updatedAt: "",
  });

  const fetchData = async (id: string | string[] | undefined) => {
    const { ok, data } = await BlogsService.getBlog(id);
    if (!ok) {
      logger.error("Failed to fetch blog");
      return;
    }
    setBlog(data);
    logger.debug("Fetched blog", data);
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <div className="h-screen w-full px-4 py-8 min-w-[500px] justify-between">
      <div className="w-full h-40 flex flex-col items-center justify-center ">
        <Title
          title={blog.title}
          className={cn(
            "bg-red-600 whitespace-nowrap max-w-auto",
            styles.title
          )}
          topLeft
        />
      </div>
      <Img
        src={blog.image}
        alt="blog"
        className="w-full h-96 object-cover rounded-md"
        width={400}
        height={300}
      />
      <div className="w-full p-6">
        <p className={cn(styles.text)}>{blog.content}</p>
      </div>
      <div className="w-full flex flex-col">
        <Title
          title={`By ${blog.authorName}`}
          className={cn("bg-red-600 self-end", styles.author)}
        />
      </div>
    </div>
  );
};

export default SingleBlog;
