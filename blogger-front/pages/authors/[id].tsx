import cn from "@/utils/classNames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthorsService from "@/services/AuthorsService";
import logger from "@/utils/logger";

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
  }, [id]);

  const [author, setAuthor] = useState<Author>({
    id: 0,
    username: "",
    name: "",
    email: "",
    blogs: [],
  });

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
    <div className="h-screen w-full px-4 py-8 min-w-[500px] justify-between">
      <div
        className={cn(
          "flex flex-col gap-2 justify-center items-center mt-8 z-20 min-w-[250px]"
        )}
      >
        <div
          className={`${randomColor()} w-72 h-72 border-gray-200 border-2 rounded-full flex justify-center items-center`}
        >
          <p className="text-7xl font-semibold text-center">
            {author.username
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </p>
        </div>
        <p className="w-fit">{author.name}</p>
        <p className="text-sm ">{author.email}</p>
      </div>
    </div>
  );
};

export default SingleAuthor;
