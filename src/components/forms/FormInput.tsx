import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl } from "@/components/ui/form";
import type { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";

interface FormInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  fieldName: string;
  labelText: string;
  placeholder?: string;
  errors: FieldErrors;
  validationRules?: RegisterOptions;
  inputType?: "text" | "email" | "number";
  compulsoryField?: boolean;
  step?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  register,
  fieldName,
  labelText,
  placeholder = "",
  errors,
  step,
  inputType = "text",
  compulsoryField = false,
  validationRules = { required: "This field is required" },
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errors[fieldName];

  return (
    <div className="space-y-1">
      <Label 
        className={`text-sm font-[600] leading-4 text-left font-inter transition-colors duration-200 ${
          hasError ? 'text-red-500' : isFocused ? 'text-[#009899]' : 'text-textColor'
        }` }
        htmlFor={fieldName}
      >
        {labelText}{" "}
        {compulsoryField && (
          <span className="text-red-400 animate-pulse">*</span>
        )}
      </Label>
      <FormControl>
        <Input
          id={fieldName}
          step={step}
          type={inputType}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
        //   onBlur={() => setIsFocused(false)}
          className={`bg-[#fff] mt-[2px] border transition-all duration-300 text-sm rounded-[4px] w-full py-[6px] px-3 placeholder:text-[#6A7280] placeholder:font-inter focus:ring-0 ${
            hasError 
              ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
              : 'border-[#89888D] focus:border-[#009899] focus:shadow-[0_0_0_3px_rgba(0,152,153,0.1)]'
          } hover:border-[#009899]/60`}
          {...register(fieldName, validationRules)}
        />
      </FormControl>
      {hasError && (
        <p className="text-red-500 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormInput;