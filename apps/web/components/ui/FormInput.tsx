"use client";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import React from "react";

type FormInput = {
  text: string;
  type: any;
  register: any;
  errors: { type: string }[];
  placeholder: string;
};

export default function FormInput({
  text,
  type,
  placeholder,
  register,
  errors,
  disabled,
  ...props
}): JSX.Element {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">{text}</Label>
      <Input
        className="h-10 w-[300px] bg-inherit placeholder:text-gray-200 placeholder:text-opacity-50 "
        placeholder={placeholder}
        type={type}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect="off"
        disabled={disabled}
        {...register}
        {...props}
      />
      {errors?.type && (
        <p className="px-1 text-xs text-red-600">{errors.type.message}</p>
      )}
    </div>
  );
}
