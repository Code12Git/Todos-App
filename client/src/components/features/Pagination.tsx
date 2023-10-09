import { Button } from "@/components/ui/button";

const Pagination = () => {
	return (
		<div className="flex justify-between mt-10">
			<Button
				variant="outline"
				className="bg-black rounded-e text-white border-none hover:bg-black hover:text-white hover:scale-110 transition delay-150 duration-200 ease-in-out"
			>
				Previous
			</Button>
			<Button
				variant="outline"
				className="bg-black rounded-e text-white border-none hover:bg-black hover:text-white hover:scale-110 transition delay-150 duration-200 ease-in-out"
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
