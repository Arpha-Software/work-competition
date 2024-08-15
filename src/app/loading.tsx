import { Loader } from "@/components/Loader";

export default async function Loading() {
  return (
    <div className="top-0 left-0 w-full h-screen fixed bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <Loader />
    </div>
  );
}
