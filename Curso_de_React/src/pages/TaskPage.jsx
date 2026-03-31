import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="w-screen h-screen bg-slate-500 p-6 flex flex-col items-center">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-12">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <DecryptedText
            text="Detalhes da Tarefa"
            speed={110}
            maxIterations={10}
            characters="ABCD1234!?"
            className="text-3xl text-slate-100 font-bold mb-12"
            parentClassName="w-full flex justify-center"
            encryptedClassName="encrypted text-slate-400"
          />
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-slate-600">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
