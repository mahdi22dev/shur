"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthRigsterSchema } from "@/lib/validation";
import FormInput from "../ui/FormInput";
import Sperate from "./Sperate";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";
import { RegisterFormData } from "@/lib/types";

const AuthRegisterForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userAuthRigsterSchema),
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

  const onSubmit = async (data: {
    email: string;
    name: string;
    password: string;
    confirm_password: string;
  }) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const responseJson = await res.json();
      if (res.status == 400) {
        toast.error(responseJson?.message);
      } else if (res.status == 200) {
        toast.success("new user registred successfully");
        // for hard navigation
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      } else if (res.status == 409) {
        toast.error(responseJson?.message);
      } else {
        setIsLoading(false);
        toast.error("something wrong happend please try again later");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        text={"Name"}
        type={"text"}
        placeholder={"Full Name"}
        register={{ ...register("name") }}
        disabled={isLoading || githubLoading}
      />
      {errors?.name && (
        <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
      )}
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
      <FormInput
        text={"Confirm Password"}
        type={"password"}
        placeholder={"Confirm Password"}
        register={{ ...register("confirm_password") }}
        disabled={isLoading || githubLoading}
      />
      {errors?.confirm_password && (
        <p className="px-1 text-xs text-red-600">
          {errors.confirm_password.message}
        </p>
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
        Sign Up
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

export default AuthRegisterForm;
