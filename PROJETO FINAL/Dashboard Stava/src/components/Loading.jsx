import { Loader2 } from "lucide-react";

function Loading({ message = "A carregar..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] gap-4">
      <Loader2 className="text-orange-500 animate-spin" size={48} />
      <p className="text-slate-400 animate-pulse font-medium tracking-wide">
        {message}
      </p>
    </div>
  );
}

export default Loading;
