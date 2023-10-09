import React from "react";

const loading = () => {
	return (
		<div>
			{" "}
			<p className="text-center text-gray-500 animate-spin h-screen m-auto">
				<svg
					className="w-6 h-6 inline-block mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					></path>
				</svg>
				Loading...
			</p>
		</div>
	);
};

export default loading;
