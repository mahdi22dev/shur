"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validation";
import { FormData } from "@/lib/types";
import { redirect } from "next/navigation";
import FormInput from "../ui/FormInput";
import Sperate from "./Sperate";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@ui/components/ui/button";

const AuthForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    try {
      const callback = await signIn("github");

      if (callback?.error) {
        console.log(callback);
        setMessage("Error during GitHub sign-in");
        setGithubLoading(false);
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
        type={"email"}
        placeholder={"Email"}
        register={{ ...register("email") }}
        disabled={isLoading || githubLoading}
      />
      {errors?.email && (
        <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
      )}
      <FormInput
        text={"Password"}
        type={"password"}
        placeholder={"Password"}
        register={{ ...register("password") }}
        disabled={isLoading || githubLoading}
      />
      {errors?.password && (
        <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
      )}
      {/* @ts-ignore */}
      <Button
        variant="default"
        className="flex gap-2"
        type="submit"
        disabled={isLoading || githubLoading}
      >
        <ClipLoader
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          loading={isLoading}
        />
        Sign In
      </Button>

      <Sperate>OR CONTINUE WITH</Sperate>
      {/* @ts-ignore */}
      <Button
        variant="outline"
        type="button"
        onClick={handleGitHubSignIn}
        disabled={isLoading || githubLoading}
        className="flex gap-2"
      >
        <ClipLoader
          size={20}
          color="white"
          aria-label="Loading Spinner"
          data-testid="loader"
          loading={githubLoading}
        />
        Github
      </Button>
    </form>
  );
};

export default AuthForm;
