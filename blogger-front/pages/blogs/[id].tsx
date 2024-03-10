import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Title from "@/components/Title/Title";
import ProfileLogo from "@/components/ProfileLogo/ProfileLogo";
import BlogsService from "@/services/BlogsService";
import cn from "@/utils/classNames";
import logger from "@/utils/logger";
import Img from "@/components/Img";
import styles from "@/styles/Authors.module.css";
import HeaderBack from "@/components/HeaderBack/HeaderBack";

interface Blog {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorUsername: string;
  authorEmail: string;
  authorId: number;
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
    authorId: 0,
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
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      <HeaderBack text="Go back" className="m-4" />
      <div className="h-screen w-full px-4 py-8 min-w-[500px] justify-between max-w-[980px] mx-auto">
        <div className="w-full h-40 flex flex-col items-center justify-center">
          <Title
            title={blog.title}
            className={cn(
              "bg-red-600 whitespace-nowrap max-w-auto text-[#ff9f1c] max-w-[",
              styles.title
            )}
            size="large"
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
        <div
          className="w-full flex flex-col cursor-pointer"
          onClick={() => router.push(`/authors/${blog.authorId}`)}
        >
          <ProfileLogo
            title={blog.authorUsername}
            size="medium"
            className="self-end"
          />
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
