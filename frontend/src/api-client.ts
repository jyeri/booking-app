import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/signIn";
import { VenueSearchResponse, VenueType } from "../../backend/src/shared/types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Sign out failed");
  }
};

export const addMyVenue = async (venueFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-venues`, {
    method: "POST",
    credentials: "include",
    body: venueFormData,
  });

  if (!response.ok) {
    throw new Error("Venue creation failed");
  }
  return response.json();
};

export const fetchMyVenues = async (): Promise<VenueType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-venues`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching venues");
  }
  return response.json();
};

export const fetchVenueById = async (venueId: string): Promise<VenueType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-venues/${venueId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching venue");
  }
  return response.json();
};

export const updateVenueById = async (venueFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-venues/${venueFormData.get("venueId")}`,
    {
      method: "PUT",
      body: venueFormData,
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Venue update failed");
  }
  return response.json();
};

export type SearchParams = {
  destination?: string;
  startDate?: string;
  endDate?: string;
  capacity?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchVenues = async (
  searchParams: SearchParams,
): Promise<VenueSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("startDate", searchParams.startDate || "");
  queryParams.append("endDate", searchParams.endDate || "");
  queryParams.append("capacity", searchParams.capacity || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });

  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/venues/search?${queryParams}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching venues");
  }

  return response.json();
};
