import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@/components/Button";
import { inputs, validator } from "@/services/constants/blogForm";
import cn from "@/utils/classNames";
import styles from "./BlogForm.module.css";
import logger from "@/utils/logger";
import useForm from "@/hooks/useForm";
import { set } from "firebase/database";
import { useRouter } from "next/router";

const INITIAL_FORM = {
  title: "",
  description: "",
  image: null,
  authorId: 1,
};

const INITIAL_ERRORS = {
  title: "",
  description: "",
  image: "",
};

interface Props {
  className?: string;
  headerTitle?: string;
  backHref?: string;
  modifyExperience?: boolean;
  initialForm?: object;
  submitService: (payload: object) => Promise<{ ok: boolean }>;
  submitLabel?: string;
}

const BlogForm: React.FC<Props> = ({
  className,
  initialForm = INITIAL_FORM,
  submitService,
  submitLabel,
}: Props): JSX.Element => {
  const router = useRouter();

  // ---------- HOOKS ---------- //
  const { form, formBuilder, errors, setForm, handleChange }: any = useForm(
    INITIAL_FORM,
    validator,
    INITIAL_ERRORS
  );

  const [loading, setLoading] = useState(false);

  // ---------- HANDLERS ---------- //

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...form };
    logger.debug("payload", payload);
    const { ok } = await submitService(payload);
    setLoading(false);
    if (ok) {
      router.push("/blogs");
    }
  };

  // ---------- EFFECTS ---------- //

  useEffect(() => {
    logger.debug("form", form);
  }, [form]);

  useEffect(() => {
    // If the initialForm prop changes, update the form state.
    setForm((prevForm: any) => ({ ...prevForm, ...initialForm }));
  }, [initialForm]);

  // ---------- CONSTANTS ---------- //

  const handleDisabled = () => {
    //check if input is empty
    if (form.title === "" || (form.content === "" && form.image !== null)) {
      return true;
    }
    //check if there are errors
    if (errors.title !== "" || errors.content !== "" || errors.image !== "") {
      return true;
    }
    //check if the form is loading
    if (loading) {
      return true;
    }
    return false;
  };

  const SubmitButton = (props: any) => (
    <Button
      handleClick={handleSubmit}
      label={submitLabel}
      disabled={handleDisabled()}
      loading={loading}
      {...props}
    />
  );

  return (
    <>
      <form onSubmit={handleSubmit} className={cn(styles.form, className, "")}>
        {formBuilder(inputs)}
        <SubmitButton
          size="medium"
          className="font-semibold cursor-pointer mx-auto w-full"
        />
      </form>
    </>
  );
};

BlogForm.propTypes = {
  className: PropTypes.string,
  headerTitle: PropTypes.string,
  backHref: PropTypes.string,
  modifyExperience: PropTypes.bool,
  initialForm: PropTypes.object,
  submitService: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

BlogForm.defaultProps = {
  className: "",
  headerTitle: "",
  backHref: "",
  modifyExperience: false,
  initialForm: {},
  submitLabel: "Enviar",
};

export default BlogForm;
