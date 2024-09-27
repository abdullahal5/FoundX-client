import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="bg-black/50 h-screen fixed inset-0 z-[999] backdrop-blur-md flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
