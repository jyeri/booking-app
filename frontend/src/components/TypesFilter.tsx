import { venueTypes } from "../config/venue-options-config";

type Props = {
  selectedTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TypesFilter = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Venue Type</h4>
      {venueTypes.map((type, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            className="rounded"
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};
