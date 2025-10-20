import toast from "react-hot-toast";


export const handleApiError = (error: unknown): void => {
  const defaultErrorMessage = "An unexpected error occurred. Please try again.";

  // Handle Axios errors
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as { response?: { data?: unknown } };
    const errorData = axiosError.response?.data;

    if (typeof errorData === "object" && errorData !== null) {
      // DRF-style { detail: "..." }
      if ("detail" in errorData) {
        toast.error(String(errorData.detail), {
          id: `error-detail-${Date.now()}`,
        });
        return;
      }

      // DRF-style { errors: [...] }
      if ("errors" in errorData && Array.isArray(errorData.errors)) {
        errorData.errors.forEach((errMsg: unknown, index: number) => {
          toast.error(String(errMsg), {
            id: `error-errors-${Date.now()}-${index}`,
          });
        });
        return;
      }

      // DRF-style { non_field_errors: [...] }
      if ("non_field_errors" in errorData && Array.isArray(errorData.non_field_errors)) {
        errorData.non_field_errors.forEach((errMsg: unknown, index: number) => {
          toast.error(String(errMsg), {
            id: `error-nonfield-${Date.now()}-${index}`,
          });
        });
        return;
      }

      // Field-level errors: { field: ["..."] }
      const errorDataRecord = errorData as Record<string, unknown>;
      for (const key in errorDataRecord) {
        if (Array.isArray(errorDataRecord[key])) {
          const errorMessages = errorDataRecord[key] as unknown[];
          errorMessages.forEach((errMsg: unknown, index: number) => {
            toast.error(`${key}: ${String(errMsg)}`, {
              id: `error-${key}-${Date.now()}-${index}`,
            });
          });
        }
      }
      return;
    }
  }

  // Native JS Error
  if (error instanceof Error) {
    toast.error(error.message || defaultErrorMessage, {
      id: `error-instance-${Date.now()}`,
    });
    return;
  }

  // Unknown error
  toast.error(defaultErrorMessage, {
    id: `error-unknown-${Date.now()}`,
  });
};
