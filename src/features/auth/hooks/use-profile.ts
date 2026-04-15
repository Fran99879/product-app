"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../services/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
  });
}