import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/signIn";
import { VenueType } from "../../backend/src/shared/types";

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
