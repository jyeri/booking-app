import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const mutation = useMutation<void, Error, void>({
    mutationFn: () => apiClient.signOut(),
    onSuccess: async () => {
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 font-bold px-3 bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};
