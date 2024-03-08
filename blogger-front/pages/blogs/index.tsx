import { useEffect, useState } from "react";
import BlogsService from "@/services/BlogsService";
import logger from "@/utils/logger";
import CardBlog from "@/components/CardBlog/CardBlog";

interface Blog {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorUsername: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
}

const Index: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 0,
      title: "",
      content: "",
      authorName: "",
      authorUsername: "",
      authorEmail: "",
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
    <div className="h-screen w-full px-4 py-8">
      <h1 className="text-center font-semibold text-[2rem]">Tell your tale</h1>
      <div className="flex flex-col items-center justify-center">
        {blogs.map(
          ({ id, title, content, authorUsername, authorEmail, authorName }) => (
            <CardBlog
              key={id}
              id={id}
              title={title}
              content={content}
              authorUsername={authorUsername}
              authorEmail={authorEmail}
              authorName={authorName}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Index;
