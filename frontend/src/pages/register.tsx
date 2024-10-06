import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation<void, Error, RegisterFormData>({
    mutationFn: (formData: RegisterFormData) => apiClient.register(formData),
    onSuccess: async () => {
      showToast({ message: "Registeration Success!", type: "SUCCESS" });
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
      <h2 className="text-3xl font-bold">Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="firstName"
            {...register("firstName", { required: "this field is required " })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs font-normal">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="lastName"
            {...register("lastName", { required: "this field is required " })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs font-normal">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
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
          Phone Number
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="mobile"
            id="mobile"
            {...register("mobile", {
              required: "this field is required ",
            })}
          />
          {errors.mobile && (
            <span className="text-red-500 text-xs font-normal">
              {errors.mobile.message}
            </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "this field is required";
              } else if (watch("password") !== value) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs font-normal">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already user?{" "}
          <Link className="underline" to="/sign-in">
            Sign in here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-200"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
