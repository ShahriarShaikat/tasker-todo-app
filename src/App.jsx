import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import TaskBoard from "./Components/TaskBoard";
import TasksProvider from "./context/taskContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <TasksProvider>
      <ToastContainer />
      <Navbar />
      <Hero />
      <TaskBoard />
      <Footer />
    </TasksProvider>
  );
}

export default App;
