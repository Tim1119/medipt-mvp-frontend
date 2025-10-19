"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl } from "@/components/ui/form";
import type { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormPasswordInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  fieldName: string;
  labelText: string;
  placeholder?: string;
  errors: FieldErrors;
  validationRules?: RegisterOptions;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  register,
  fieldName,
  labelText,
  placeholder = "Enter your password",
  errors,
  validationRules = { required: "Password is required" },
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errors[fieldName];

  return (
    <div className="space-y-1">
      <Label 
        htmlFor={fieldName}
        className={`text-sm font-[600] leading-4 transition-colors duration-200 ${
          hasError ? 'text-red-500' : isFocused ? 'text-[#009899]' : 'text-textColor'
        }`}
      >
        {labelText}
      </Label>
      <div className="relative group">
        <FormControl>
          <Input
            id={fieldName}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            className={`bg-[#fbfafd] mt-[2px] border transition-all duration-300 text-sm rounded-[4px] w-full py-[6px] px-3 pr-10 placeholder:text-[#6A7280] placeholder:font-inter focus:ring-0 ${
              hasError 
                ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
                : 'border-[#89888D] focus:border-[#009899] focus:shadow-[0_0_0_3px_rgba(0,152,153,0.1)]'
            } hover:border-[#009899]/60`}
            {...register(fieldName, validationRules)}
          />
        </FormControl>
        <button
          type="button"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
            hasError ? 'text-red-500' : 'text-gray-500 hover:text-[#009899]'
          } focus:outline-none focus:text-[#009899] active:scale-95`}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} className="transition-transform duration-200 hover:scale-110" />
          ) : (
            <Eye size={18} className="transition-transform duration-200 hover:scale-110" />
          )}
        </button>
      </div>
      {hasError && (
        <p className="text-red-500 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormPasswordInput;