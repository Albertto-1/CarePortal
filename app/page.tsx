import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { caller } from "../server/trpc";
import FacilityMatchingForm from "./_components/FacilityMatchingForm";

export default async function Home() {
  const queryClient = getQueryClient();

  // Just to test trpc
  const facilities = await caller.facilities();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-bg w-screen h-screen overflow-auto flex flex-col p-8 relative">
        <div className="hidden">{JSON.stringify(facilities)}</div>

        <div className="mx-auto w-full max-w-6xl sticky top-0">
          <img
            src="https://caremates.de/logos/CareMatesLogo.png"
            className="w-48"
          />
        </div>

        <FacilityMatchingForm />
      </main>
    </HydrationBoundary>
  );
}
