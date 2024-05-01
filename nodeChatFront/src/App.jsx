import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Chat",
    element: <ChatPage />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
