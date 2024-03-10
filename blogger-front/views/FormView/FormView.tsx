import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@/components/Button";
import cn from "@/utils/classNames";
import logger from "@/utils/logger";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/router";

interface Props {
  className?: string;
  modifyExperience?: boolean;
  initialForm?: object;
  submitService: (payload: object) => Promise<{ ok: boolean }>;
  submitLabel?: string;
  initialErrors?: object;
  inputs: object;
  validator?: any;
  forwardTo?: string;
}

const FormView: React.FC<Props> = ({
  className,
  initialForm,
  submitService,
  submitLabel,
  initialErrors,
  inputs,
  validator,
  forwardTo,
}: Props): JSX.Element => {
  const router = useRouter();

  // ---------- HOOKS ---------- //
  const { form, formBuilder, errors, setForm }: any = useForm(
    initialForm,
    validator,
    initialErrors
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
      router.push(forwardTo || "/blogs");
    }
  };

  // ---------- EFFECTS ---------- //
  useEffect(() => {
    // If the initialForm prop changes, update the form state.
    setForm((prevForm: any) => ({ ...prevForm, ...initialForm }));
  }, [initialForm]);

  // ---------- CONSTANTS ---------- //

  const handleDisabled = () => {
    //check if input is empty
    for (const input in form) {
      if (!form[input]) {
        return true;
      }
    }
    //check if there are errors
    for (const error in errors) {
      if (errors[error]) {
        return true;
      }
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
      <form
        onSubmit={handleSubmit}
        className={cn(
          className,
          "mx-auto relative w-full px-3 flex flex-col gap-2"
        )}
      >
        {formBuilder(inputs)}
        <SubmitButton
          size="medium"
          className="font-semibold cursor-pointer mx-auto w-full"
        />
      </form>
    </>
  );
};

FormView.propTypes = {
  className: PropTypes.string,
  modifyExperience: PropTypes.bool,
  initialForm: PropTypes.object,
  submitService: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

FormView.defaultProps = {
  className: "",
  modifyExperience: false,
  initialForm: {},
  submitLabel: "Enviar",
};

export default FormView;
