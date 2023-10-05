import Cards from "@/components/common/Cards";
import Todo from "@/components/features/Todo";
import { privateRequest } from "@/utils/axios";

export default async function Home() {
	return (
		<main>
			<Todo />
			<Cards />
		</main>
	);
}
