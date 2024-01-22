"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthRigsterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormInput from "../ui/FormInput";
import Sperate from "./Sperate";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";

const AuthRegisterForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    name: string;
    password: string;
    confirm_password: string;
  }>({
    resolver: zodResolver(userAuthRigsterSchema),
  });

  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    try {
      const callback = await signIn("github");

      if (callback?.error) {
        toast.error("Error during GitHub sign-in");
        setGithubLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        const promise = () =>
          new Promise((resolve) => setTimeout(resolve, 3000));

        toast.promise(promise, {
          loading: "Loading...",
          // @ts-ignore
          success: () => {
            toast.success("Redirecting...");
            redirect("/dashboard");
          },
          error: "Error redirecting",
        });
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
        const promise = () =>
          new Promise((resolve, reject) => {
            signIn("credentials", { ...data, redirect: false }).then(
              (callback) => {
                if (callback?.error) {
                  console.log(callback);
                  reject(callback);
                }
                if (callback?.ok && !callback?.error) {
                  setTimeout(() => {
                    resolve(callback);
                  }, 2000);
                }
              }
            );
          });

        toast.promise(promise, {
          loading: "Loading...",
          // @ts-ignore
          success: () => {
            toast.success("Register new user...");
            redirect("/dashboard");
          },
          error: "Error regsitring new user",
        });

        // await signIn("credentials", { ...data, redirect: false }).then(
        //   (callback) => {
        //     if (callback?.error) {
        //       console.log(callback);
        //       setIsLoading(false);
        //     }
        //     if (callback?.ok && !callback?.error) {
        //       setTimeout(() => {
        //         redirect("/dashboard");
        //       }, 2000);
        //     }
        //   }
        // );
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
        text={"name"}
        type={"text"}
        placeholder={"Full Name"}
        register={{ ...register("name") }}
        disabled={isLoading || githubLoading}
      />
      {errors?.name && (
        <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
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
        text={"Password"}
        type={"password"}
        placeholder={"Confirm Password"}
        register={{ ...register("confirm_password") }}
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
