export default async function Home() {
  const facilities = await fetch("http://localhost:3001/api/facility");

  return (
    <div className="">
      <main className="">{JSON.stringify(await facilities.json())}</main>
    </div>
  );
}
