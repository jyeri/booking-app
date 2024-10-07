import { ManageVenueForm } from "../forms/ManageVenueForm/ManageVenueForm";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client"; // Import apiClient

export const AddVenue = () => {
  const { showToast } = useAppContext();

  const { mutate, status } = useMutation({
    mutationFn: apiClient.addMyVenue,
    onSuccess: () => {
      showToast({ message: "Venue added successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const isMutating = status === "pending";

  const handleSave = (venueFormData: FormData) => {
    mutate(venueFormData);
  };
  return <ManageVenueForm onSave={handleSave} isLoading={isMutating} />;
};
