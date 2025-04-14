import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { caller } from "../trpc/caller";
import Navbar from "./_components/NavBar";
import FacilityMatchingView from "./_views/FacilityMatchingView";

export default async function Home() {
  const queryClient = getQueryClient();
  // Just to test trpc on server component
  const facilities = await caller.facilities();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-bg w-screen h-screen overflow-auto flex flex-col relative">
        <div className="hidden" id="test-facilities">
          {JSON.stringify(facilities)}
        </div>

        <Navbar />

        <FacilityMatchingView />
      </main>
    </HydrationBoundary>
  );
}
