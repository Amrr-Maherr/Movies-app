import { useMutation } from "@tanstack/react-query";
import { signup, login, type SignupData, type LoginData } from "@/services";

/**
 * Hook for handling user signup
 * @returns Mutation object with signup function and state
 * 
 * @example
 * const { mutate: signupUser, isPending, error, data } = useSignup();
 * signupUser({ name, email, password, rePassword, phone });
 */
export function useSignup() {
  return useMutation({
    mutationFn: (data: SignupData) => signup(data),
    mutationKey: ["auth", "signup"],
  });
}

/**
 * Hook for handling user login
 * @returns Mutation object with login function and state
 * 
 * @example
 * const { mutate: loginUser, isPending, error, data } = useLogin();
 * loginUser({ email, password });
 */
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    mutationKey: ["auth", "login"],
  });
}

export default useSignup;
