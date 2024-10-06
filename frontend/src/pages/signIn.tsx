import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation<void, Error, SignInFormData>({
    mutationFn: (formData: SignInFormData) => apiClient.signIn(formData),
    onSuccess: async () => {
      showToast({ message: "Sign In Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold text-3xl">sign-in</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          id="email"
          {...register("email", { required: "this field is required " })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs font-normal">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          id="password"
          {...register("password", {
            required: "this field is required ",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs font-normal">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-200"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};
