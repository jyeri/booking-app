import { VenueFormData } from "./ManageVenueForm";
import { useFormContext } from "react-hook-form";

export const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VenueFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-5 gap-4">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} className="min-h-full object-cover"></img>
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex text-white items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
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
