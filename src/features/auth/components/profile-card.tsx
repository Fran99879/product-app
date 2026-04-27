"use client";

import { useProfile } from "../hooks/use-profile";
import { Spinner } from "@/components/ui/spinner";

export function ProfileCard() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
  return (
    <div className="flex justify-center py-10">
      <Spinner />
    </div>
  );
}

  return (
    <div className="rounded-2xl border p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold">Mi perfil</h1>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Username:</span>{" "}
          {data.username}
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          {data.email}
        </p>

        <p>
          <span className="font-semibold">Role:</span>{" "}
          {data.role}
        </p>
      </div>
    </div>
  );
}