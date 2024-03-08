import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import useForm from "@/hooks/useForm";
import HeaderBack from "@/components/HeaderBack";
import Button from "@/components/Button";
import ButtonAdd from "@/components/ButtonAdd";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import InputTextArea from "@/components/InputTextArea";
import { inputs, validator } from "@/services/constants/blogForm";
import { experiences } from "@/services/constants/filterTags";
import cn from "@/utils/classNames";
import styles from "./BlogForm.module.css";

const INITIAL_FORM = {
  title: "",
  description: "",
  logoUrl: null,
};

const INITIAL_ERRORS = {
  title: "",
  description: "",
  logoUrl: "",
};

interface Props {
  className?: string;
  headerTitle?: string;
  backHref?: string;
  modifyExperience?: boolean;
  initialForm?: object;
  handleSuccessfulSubmit: (form: object) => void;
  submitService: (payload: object) => Promise<{ ok: boolean }>;
  submitLabel?: string;
}

const BlogForm: React.FC<Props> = ({
  className,
  headerTitle,
  backHref,
  modifyExperience,
  initialForm = INITIAL_FORM,
  submitService,
  submitLabel,
}: Props): JSX.Element => {
  const { form, formBuilder, errors, setForm } = useForm(
    initialForm,
    validator,
    INITIAL_ERRORS
  );

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false); // This is for the submit button of the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (disabled) return;

    const payload = { ...form };
    const { ok } = await submitService(payload);

    setLoading(false);
  };

  // ---------- EFFECTS ---------- //

  useEffect(() => {
    // If the initialForm prop changes, update the form state.
    setForm((prevForm) => ({ ...prevForm, ...initialForm }));
  }, [initialForm]);

  useEffect(() => {
    // Enable submit button if all required fields are filled and there are no errors.
    if (
      !Object.values(errors).some((value) => value) && // No errors
      // All required fields are filled.
      form.title &&
      form.description &&
      form.logoUrl
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form]);

  // ---------- CONSTANTS ---------- //

  const SubmitButton = (props: any) => (
    <Button
      handleClick={handleSubmit}
      label={submitLabel}
      disabled={disabled}
      loading={loading}
      {...props}
    />
  );

  return (
    <>
      <form onSubmit={handleSubmit} className={cn(styles.form, className, "")}>
        {formBuilder(inputs)}
        <SubmitButton size="medium" className={styles.mobileSubmitButton} />
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
  handleSuccessfulSubmit: PropTypes.func.isRequired,
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
