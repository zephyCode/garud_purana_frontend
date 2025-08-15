import type React from "react";

interface Props {
    className: string,
    count: number
}

const UpvoteIcon:React.FC<Props> = ({ className, count }) => (
    <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
        </svg>
        <p>{count}</p>
    </div>
);

export default UpvoteIcon;