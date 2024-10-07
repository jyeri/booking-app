import { FormProvider, useForm } from "react-hook-form";
import { DetailsSection } from "./DetailsSection";
import { TypeSection } from "./TypeSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { CapacitySection } from "./CapacitySection";
import { ImagesSection } from "./ImagesSection";

export type VenueFormData = {
  name: string;
  city: string;
  country: string;
  address: string;
  description: string;
  type: string;
  capacity: number;
  facilities: string[];
  pricePerHour: number;
  starRating: number;
  imageFiles: FileList;
};

type Props = {
  onSave: (VenueFormData: FormData) => void;
  isLoading: boolean;
};

export const ManageVenueForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<VenueFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: VenueFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("address", formDataJson.address);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("capacity", formDataJson.capacity.toString());
    formData.append("pricePerHour", formDataJson.pricePerHour.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <CapacitySection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white text-xl p-3 hover:bg-blue-500 rounded-md disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
