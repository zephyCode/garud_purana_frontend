import Upvote from "../components/Upvote";
import Downvote from "../components/Downvote";
import { type FC } from "react";

type VoteType = "upvote" | "downvote";

interface Props {
  id: number;
  date: string;
  user_query: string;
  upvotes: number;
  downvotes: number;
  voted?: VoteType | string;
  punishment: string;
  onVote: (id: number, vote: VoteType) => void;
}

const ListItem: FC<Props> = ({
  id,
  date,
  user_query,
  upvotes,
  downvotes,
  voted,
  punishment,
  onVote,
}) => {
  return (
    <div
      className="
    bg-black/60 border border-red-700 rounded-2xl p-4 sm:p-6 
    backdrop-blur-sm shadow-2xl shadow-red-900 
    transition-transform hover:scale-[1.02] hover:shadow-lg 
    flex flex-col sm:flex-row sm:justify-between sm:items-center
    gap-4 sm:gap-6
  "
    >
      <div className="flex-grow">
        <div className="text-xs sm:text-sm text-red-400 mb-1">{date}</div>
        <p className="text-red-200 italic tracking-wide text-sm sm:text-base break-words">
          {user_query}
        </p>

        <p className="text-red-400 text-xs sm:text-sm mt-2">
           <span className="font-bold">{punishment == '' ? 'BACH GYA YEH' : `🔥 ${punishment}`}</span>
        </p>
      </div>

      <div className="flex sm:flex-col justify-end space-x-4 sm:space-x-0 sm:space-y-2">
        <button
          onClick={() => onVote(id, "upvote")}
          disabled={!!voted}
          className={`font-bold py-2 px-4 rounded w-24 text-center transition-colors duration-300
        ${
          voted
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-red-700 text-white hover:bg-red-800"
        }
        ${voted === "upvote" ? "border-2 border-white" : ""}
      `}
        >
          <Upvote className="h-5 w-5 sm:h-6 sm:w-6 mx-auto" count={upvotes} />
        </button>

        <button
          onClick={() => onVote(id, "downvote")}
          disabled={!!voted}
          className={`font-bold py-2 px-4 rounded w-24 text-center transition-colors duration-300
        ${
          voted
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-800"
        }
        ${voted === "downvote" ? "border-2 border-white" : ""}
      `}
        >
          <Downvote
            className="h-5 w-5 sm:h-6 sm:w-6 mx-auto"
            count={downvotes}
          />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
