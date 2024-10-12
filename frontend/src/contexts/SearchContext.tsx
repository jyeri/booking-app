import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  startDate: Date;
  endDate: Date;
  venueId: string;
  capacity: number;
  saveSearchValues: (
    destination: string,
    startDate: Date,
    endDate: Date,
    capacity: number,
    venueId: string,
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [capacity, setCapacity] = useState<number>(1);
  const [venueId, setVenueId] = useState<string>("");

  const saveSearchValues = (
    destination: string,
    startDate: Date,
    endDate: Date,
    capacity: number,
    venueId?: string,
  ) => {
    setDestination(destination);
    setStartDate(startDate);
    setEndDate(endDate);
    setCapacity(capacity);
    if (venueId) {
      setVenueId(venueId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        startDate,
        endDate,
        capacity,
        venueId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
