import Title from "@/components/Title";
import AuthServices from "@/services/AuthServices";
import { inputs, validator } from "@/services/constants/registerForm";
import cn from "@/utils/classNames";
import logger from "@/utils/logger";
import FormView from "@/views/FormView";
import { useRouter } from "next/router";

const INITIAL_ERRORS = {
  name: "",
  username: "",
  email: "",
};

const INITIAL_FORM = {
  name: "",
  username: "",
  email: "",
};

const Register: React.FC = () => {
  const rounter = useRouter();

  return (
    <div className="h-screen w-full px-4 py-8 min-w-[500px] flex flex-col justify-center max-w-[700px] mx-auto">
      <Title
        title="Register"
        className={cn(
          "bg-red-600 whitespace-nowrap max-w-auto text-[#ff9f1c] mx-auto"
        )}
        topLeft
        size="large"
      />
      <div>
        <div className="flex flex-col justify-center items-center mt-24">
          <h2 className="text-2xl font-semibold mb-5">Begin your journey!</h2>
        </div>
        <FormView
          initialForm={INITIAL_FORM}
          initialErrors={INITIAL_ERRORS}
          submitLabel="Send us your adventure!"
          submitService={AuthServices.Register}
          inputs={inputs}
          validator={validator}
          forwardTo="/auth/login"
        />
      </div>
    </div>
  );
};

export default Register;
