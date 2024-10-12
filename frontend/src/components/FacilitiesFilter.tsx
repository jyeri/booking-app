import { venueFacilites } from "../config/venue-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {venueFacilites.map((facility, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            className="rounded"
            type="checkbox"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};
