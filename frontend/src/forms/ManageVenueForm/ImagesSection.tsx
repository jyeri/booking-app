import { VenueFormData } from "./ManageVenueForm";
import { useFormContext } from "react-hook-form";

export const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<VenueFormData>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "You must upload at least one image";
              }
              if (totalLength > 6) {
                return "Image count should not exceed 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-xs font-normal">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};
