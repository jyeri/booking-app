import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { ManageVenueForm } from "../forms/ManageVenueForm/ManageVenueForm";
import { useAppContext } from "../contexts/AppContext";

export const EditVenue = () => {
  const { venueId } = useParams();
  const { showToast } = useAppContext();

  const { data: venue } = useQuery({
    queryKey: ["fetchVenueById", venueId],
    queryFn: () => apiClient.fetchVenueById(venueId || ""),
    enabled: !!venueId,
  });

  const { mutate, status } = useMutation({
    mutationFn: apiClient.updateVenueById,
    onSuccess: () => {
      showToast({ message: "Venue Saved!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const isMutating = status === "pending";

  const handleSave = (venueFormData: FormData) => {
    mutate(venueFormData);
  };

  return (
    <ManageVenueForm venue={venue} onSave={handleSave} isLoading={isMutating} />
  );
};
