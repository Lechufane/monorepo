import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BlogForm from "@/views/BlogForm";
import BlogsService from "@/services/BlogsService";
import HeaderBack from "@/components/HeaderBack";
import Title from "@/components/Title";
import cn from "@/utils/classNames";
import styles from "@/styles/Blogs.module.css";

const CreateBlog = () => {
  const router = useRouter();

  return (
    <>
      <HeaderBack text="Go back" />
      <div className="w-full p-8 flex items-center justify-center">
        <Title
          title="Share an adventure"
          className={cn("bg-red-600 whitespace-nowrap", styles.title)}
          topLeft
        />
      </div>
      <div className="w-full flex flex-col gap-1 p-3 mb-[2rem] max-w-[700px] mx-auto ">
        <BlogForm
          headerTitle="Solicitud de nuevo Blog"
          backHref="/partner/blogs"
          submitLabel="Solicitar Blog"
          submitService={BlogsService.createBlog}
        />
      </div>
    </>
  );
};

export default CreateBlog;
