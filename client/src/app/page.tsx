import Cards from "@/components/common/Cards";
import Header from "@/components/common/Header";
import Pagination from "@/components/features/Pagination";
import Sorting from "@/components/features/Sorting";
import Todo from "@/components/features/Todo";
import { privateRequest } from "@/utils/axios";

export default async function Home() {
	return (
		<>
			<Header />
			<main className="bg-gradient-to-r from-pink-400 via-red-200 to-violet-400 p-4">
				<Sorting />
				<Todo />
				<Cards />
			</main>
		</>
	);
}
