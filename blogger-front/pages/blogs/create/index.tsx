import { useRouter } from "next/router";
import FormView from "@/views/FormView";
import BlogsService from "@/services/BlogsService";
import HeaderBack from "@/components/HeaderBack";
import Title from "@/components/Title";
import { inputs, validator } from "@/services/constants/blogForm";
import cn from "@/utils/classNames";
import { useEffect, useState } from "react";
import AuthorsService from "@/services/AuthorsService";
import AuthServices from "@/services/AuthServices";

const INITIAL_ERRORS = {
  title: "",
  content: "",
  image: "",
};

const INITIAL_FORM = {
  title: "",
  content: "",
  image: null,
  authorId: 0,
};

const CreateBlog = () => {
  const router = useRouter();

  const [initialForm, setInitialForm] = useState(INITIAL_FORM);

  const validateUser = async () => {
    const email = localStorage.getItem("token");

    if (!email) {
      router.push("/auth/login");
    }

    const response = await AuthServices.Login(email);
    const { ok, data } = response;
    if (ok) {
      setInitialForm({
        ...initialForm,
        authorId: data.id,
      });
    }
  };

  useEffect(() => {
    validateUser();
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
          initialForm={initialForm}
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
