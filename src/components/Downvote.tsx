import type React from "react";

interface Props {
    className: string,
    count: number,
}

const Downvote: React.FC<Props> = ({ className, count }) => (
    <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 20l-8-8h6V4h4v8h6l-8 8z"/>
    </svg>
        <p>{count}</p>
    </div>
);

export default Downvote;