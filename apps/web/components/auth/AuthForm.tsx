"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validation";
import { FormData } from "@/lib/types";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import FormInput from "../ui/FormInput";
import Sperate from "./Sperate";

const AuthForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      const callback = await signIn("github");

      if (callback?.error) {
        console.log(callback);
        setMessage("Error during GitHub sign-in");
        setIsLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        console.log(callback);
        setMessage("redirect...");
        setTimeout(() => {
          redirect("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);

    await signIn("credentials", { ...data, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          console.log(callback);
          setMessage("Password wrong or the email doesn't exist");
          setIsLoading(false);
        }
        if (callback?.ok && !callback?.error) {
          setMessage("redirect...");
          console.log(callback);
          setTimeout(() => {
            redirect("/dashboard");
          }, 2000);
        }
      }
    );
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        text={"Email"}
        errors={errors}
        type={"email"}
        placeholder={"Email"}
        register={{ ...register("email") }}
        disabled={isLoading}
      />
      <FormInput
        text={"Password"}
        errors={errors}
        type={"password"}
        placeholder={"Password"}
        register={{ ...register("password") }}
        disabled={isLoading}
      />

      <Button variant="default" type="submit" disabled={isLoading}>
        Sign In
      </Button>

      <Sperate>OR CONTINUE WITH</Sperate>

      <Button
        variant="outline"
        type="button"
        onClick={handleGitHubSignIn}
        disabled={isLoading}
      >
        Github
      </Button>
    </form>
  );
};

export default AuthForm;
