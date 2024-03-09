/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import cn from "@/utils/classNames";
import Link from "next/link";

const login: React.FC = () => {
  const [loginInput, setLoginInput] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: any) => {
    const { value } = e.target;
    const newLoginInput = { email: value };
    setLoginInput(newLoginInput);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const { ok, data } = await sendOtp(loginInput);// TODO: implement mail validation
    setLoading(false);
    // if (!ok) {
    //   setErrorMessage(data ?? "Lo sentimos, ha ocurrido un error");
    //   return;
    // }
    router.push(`/blogs`);
  };

  return (
    <div className="h-screen w-full px-4 py-8 min-w-[500px] justify-between max-w-[980px] mx-auto">
      <Title
        title="Login"
        className={cn(
          "bg-red-600 whitespace-nowrap max-w-auto text-[#ff9f1c] text-8xl mx-auto"
        )}
        topLeft
      />
      <form
        onSubmit={handleLogin}
        className={cn(
          "min-h-screen w-full text-center max-w-[400px] grid justify-items-center items-start mx-auto py-7 px-3"
        )}
      >
        <div className="w-full flex flex-col justify-center items-center py-5">
          <h2 className="text-2xl font-semibold mb-5">Iniciar sesión</h2>
          <Input
            value={loginInput["email"]}
            name="email"
            type="email"
            size="large"
            placeholder="Email"
            className="font-semibold mb-4"
            handleChange={handleChange}
            errorMessage={errorMessage}
          />
          <div className="font-normal text-center text-[1.1rem] my-4">
            Don`t have an account?{" "}
            <Link
              href="/auth/register"
              className={cn("font-semibold underline")}
            >
              Register here
            </Link>
          </div>
        </div>

        <Button
          disabled={loginInput["email"].length === 0}
          className="mt-7 mb-5"
          label={"Continuar"}
          loading={loading}
          handleClick={handleLogin}
          size={"large"}
        />
      </form>
    </div>
  );
};

export default login;