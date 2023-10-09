import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Sorting = () => {
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Sorting" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Prioritized(asc)</SelectItem>
				<SelectItem value="dark">Prioritized(desc)</SelectItem>
				<SelectItem value="system">Random</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default Sorting;
