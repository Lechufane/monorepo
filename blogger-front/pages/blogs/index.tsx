import { useEffect, useState } from "react";
import BlogsService from "@/services/BlogsService";
import logger from "@/utils/logger";

interface Blog {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

const Index: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 0,
      title: "",
      content: "",
      authorId: 0,
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const fetchBlogs = async () => {
    const { ok, data } = await BlogsService.getBlogsByAuthorId(1);
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
    <div className="h-screen w-full py-8">
      <h1 className="text-center font-semibold text-[2rem]">Blog</h1>
      <div className="flex flex-col items-center">
        {blogs.map(({ id, title, content }) => (
          <div
            key={id}
            className="w-full h-[5rem] overflow-hidden m-2 text-ellipsis overflow-ellipsis"
          >
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-gray-500">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
