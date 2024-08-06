import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Todo } from "@components/Todo";
import { TodosProvider } from "@context";

export function App() {
  return (
    <>
      <TodosProvider>
        <Header />
        <Todo />
        <Footer />
      </TodosProvider>
    </>
  );
}
