import { useFormContext } from "react-hook-form";
import { venueTypes } from "../../config/venue-options-config";
import { VenueFormData } from "./ManageVenueForm";

export const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<VenueFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Type </h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {venueTypes.map((type) => (
          <label
            key={type}
            className={
              type === typeWatch
                ? "text-center cursor-pointer bg-blue-300 text-xs rounded-full px-4 py-2 font-normal"
                : "text-center cursor-pointer bg-gray-300 text-xs rounded-full px-4 py-2 font-normal"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", { required: "Type selection is required!" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-xs font-normal">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};
