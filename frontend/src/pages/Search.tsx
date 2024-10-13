import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import { SearchResultCard } from "../components/SearchResultCard";
import { Pagination } from "../components/Pagination";
import { StarRatingFilter } from "../components/StarRatingFilter";
import { TypesFilter } from "../components/TypesFilter";
import { FacilitiesFilter } from "../components/FacilitiesFilter";
import { PriceFilter } from "../components/PriceFilter";

export const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    startDate: search.startDate.toISOString(),
    endDate: search.endDate.toISOString(),
    capacity: search.capacity.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: venueData } = useQuery({
    queryKey: ["venues", searchParams],
    queryFn: () => apiClient.searchVenues(searchParams),
  });

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating),
    );
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedTypes((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((selectedType) => selectedType !== facility),
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const facility = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((selectedFacility) => selectedFacility !== facility),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <TypesFilter
            selectedTypes={selectedTypes}
            onChange={handleTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilitiesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {venueData?.pagination.total} Venues found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select className="p-2 border rounded-sm" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerHourAsc">Price (low to high)</option>
            <option value="pricePerHourDesc">Price (high to low)</option>
          </select>
        </div>
        {venueData?.data.map((venue, index) => (
          <SearchResultCard key={index} venue={venue} />
        ))}
        <div>
          <Pagination
            page={venueData?.pagination.page || 1}
            pages={venueData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
