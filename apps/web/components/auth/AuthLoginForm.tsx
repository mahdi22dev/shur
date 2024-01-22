"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthLoginSchema } from "@/lib/validation";
import { LogInFormData } from "@/lib/types";
import FormInput from "../ui/FormInput";
import Sperate from "./Sperate";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";

const AuthLoginForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(userAuthLoginSchema),
  });

  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    try {
      const callback = await signIn("github");
      toast.loading("sign in with github...");
      if (callback?.error) {
        toast.error("Error during GitHub sign-in");
        setGithubLoading(false);
      }
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
    }
  };

  const onSubmit = async (data: LogInFormData) => {
    setIsLoading(true);
    console.log(data);

    try {
      await signIn("credentials", { ...data, redirect: false }).then(
        (callback) => {
          if (callback?.error) {
            setIsLoading(false);
            toast.success(
              "Password or Email is wrong please correct your data"
            );
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Sign in successfully");
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 500);
          }
        }
      );
    } catch (error) {
      toast.error("something wrong happend please try again later");
    }
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

export default AuthLoginForm;
