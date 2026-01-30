import { error } from "./response.utlis";

export const asyncHandler = (fn: Function) =>
  async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.error("API_ERROR:", err);
      return error("Internal Server Error", 500, err instanceof Error ? err.message : err);
    }
  };
