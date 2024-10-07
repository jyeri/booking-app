import { useFormContext } from "react-hook-form";
import { venueFacilites } from "../../config/venue-options-config";
import { VenueFormData } from "./ManageVenueForm";

export const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<VenueFormData>();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {venueFacilites.map((facility) => (
          <label
            key={facility}
            className="text-xs text-center flex flex-row gap-1 "
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities: string[]) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "You must select at least one facility";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-xs font-normal">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};
