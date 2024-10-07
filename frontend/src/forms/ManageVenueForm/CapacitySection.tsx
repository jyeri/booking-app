import { useFormContext } from "react-hook-form";
import { VenueFormData } from "./ManageVenueForm";

export const CapacitySection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<VenueFormData>();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3"> Venue maximum capacity</h2>
      <label className="text-gray-700 flex-col gap-1 flex text-sm font-bold max-w-[50%]">
        Capacity
        <input
          className="border rounded py-1 px-2 font-normal"
          type="number"
          id="capacity"
          min={1}
          {...register("capacity", { required: "this field is required " })}
        />
        {errors.capacity && (
          <span className="text-red-500 text-xs font-normal">
            {errors.capacity.message}
          </span>
        )}
      </label>
    </div>
  );
};
