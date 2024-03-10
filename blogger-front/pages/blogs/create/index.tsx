import { useRouter } from "next/router";
import FormView from "@/views/FormView";
import BlogsService from "@/services/BlogsService";
import HeaderBack from "@/components/HeaderBack";
import Title from "@/components/Title";
import { inputs, validator } from "@/services/constants/blogForm";
import cn from "@/utils/classNames";
import { useEffect } from "react";

const INITIAL_ERRORS = {
  title: "",
  content: "",
  image: "",
};

const INITIAL_FORM = {
  title: "",
  content: "",
  image: null,
  authorId: 1,
};

const CreateBlog = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <HeaderBack text="Go back" className="m-4" />
      <div className="w-full p-8 flex items-center justify-center">
        <Title
          title="Share an adventure"
          className={cn("bg-red-600 whitespace-nowrap")}
          size="large"
          topLeft
        />
      </div>
      <div className="w-full flex flex-col gap-1 p-3 mb-[2rem] max-w-[700px] mx-auto ">
        <FormView
          initialForm={INITIAL_FORM}
          initialErrors={INITIAL_ERRORS}
          submitLabel="Send us your adventure!"
          submitService={BlogsService.createBlog as any}
          inputs={inputs}
          validator={validator}
          forwardTo="/blogs"
        />
      </div>
    </>
  );
};

export default CreateBlog;
