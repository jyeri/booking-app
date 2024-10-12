import { VenueType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

type Props = {
  venue: VenueType;
};

export const SearchResultCard = ({ venue }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={venue.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: venue.starRating }).map((_star, index) => (
                <div key={index}>
                  <AiFillStar className="fill-yellow-500" />
                </div>
              ))}
            </span>
            <span className="ml-1 text-sm">{venue.type}</span>
          </div>
          <Link
            to={`/detail/${venue._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {venue.name}
          </Link>
        </div>
        <div>
          <p className="line-clamp-4">{venue.description}</p>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {venue.facilities.slice(0, 2).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {" "}
              {venue.facilities.length > 2 &&
                `+${venue.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">€{venue.pricePerHour} / h</span>
            <Link
              to={`/detail/${venue._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
            >
              {" "}
              View More{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
