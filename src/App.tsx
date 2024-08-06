import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
/* import { Todo } from "@components/Todo"; */
import { TodosProvider } from "@context";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Header />
      <TodosProvider>
        {/* <Todo /> */}
        <main className="main-content" style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <Outlet />
        </main>
      </TodosProvider>
      <Footer />
    </>
  );
}
