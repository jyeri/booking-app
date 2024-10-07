import { useFormContext } from "react-hook-form";
import { VenueFormData } from "./ManageVenueForm";

export const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<VenueFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Venue</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          id="name"
          {...register("name", { required: "this field is required " })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs font-normal">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="city"
            {...register("city", { required: "this field is required " })}
          />
          {errors.city && (
            <span className="text-red-500 text-xs font-normal">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            id="country"
            {...register("country", { required: "this field is required " })}
          />
          {errors.country && (
            <span className="text-red-500 text-xs font-normal">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Address
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          id="address"
          {...register("address", { required: "this field is required " })}
        />
        {errors.address && (
          <span className="text-red-500 text-xs font-normal">
            {errors.address.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          className="border rounded w-full py-1 px-2 font-normal"
          rows={8}
          id="description"
          {...register("description", { required: "this field is required " })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs font-normal">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Hourly Price
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="number"
          min={1}
          id="pricePerHour"
          {...register("pricePerHour", { required: "this field is required " })}
        />
        {errors.pricePerHour && (
          <span className="text-red-500 text-xs font-normal">
            {errors.pricePerHour.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "this field is required ",
          })}
          className="border rounded w-full py-1 px-2 font-normal"
        >
          <option className="text-sm font-semibold" value="">
            Select a rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 text-xs font-normal">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};
