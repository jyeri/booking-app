import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsMap, BsBuilding, BsFillHouseAddFill } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";

export const MyVenues = () => {
  const { data: venueData } = useQuery({
    queryKey: ["fetchMyVenues"],
    queryFn: apiClient.fetchMyVenues,
  });

  if (!venueData) {
    return <span>No venues found to display</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-2xl font-bold">My Venues</h1>
        <Link
          to="/add-venue"
          className="bg-blue-500 text-white text-lg font-bold px-3 py-1 rounded hover:bg-blue-300"
        >
          Add Venue
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {venueData.map((venue, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{venue.name}</h2>
            <div className="whitespace-pre-line">{venue.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center">
                <span className="flex text-md">
                  <BsMap className="mr-1" />
                  {venue.city}, {venue.country}
                </span>
                <span className="flex text-sm">{venue.address}</span>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BsBuilding className="mr-1" />
                {venue.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BiMoney className="mr-1" />
                {venue.pricePerHour} €/hour
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BsFillHouseAddFill className="mr-1" />
                {venue.capacity} - capacity
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BiStar className="mr-1" />
                {venue.starRating} / 5
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-venue/${venue._id}`}
                className="bg-blue-500 text-white text-lg font-bold px-3 py-1 rounded hover:bg-blue-300"
              >
                {" "}
                View
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
