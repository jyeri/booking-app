import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [startDate, setStartDate] = useState<Date>(search.startDate);
  const [endDate, setEndDate] = useState<Date>(search.endDate);
  const [capacity, setCapacity] = useState<number>(search.capacity);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, startDate, endDate, capacity, search.venueId);
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-300 rounded shadow-md grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row flex-1 items-center bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where to?"
          className="w-full text-md focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Players:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={100}
            value={capacity}
            onChange={(event) => setCapacity(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Start Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date as Date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="End Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
