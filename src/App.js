import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListinItems from "./pages/ListinItems";
import Login from "./pages/Login";
import CardDetails from "./pages/CardDetails";

const router = createBrowserRouter ([
  {
    path:"/",
    element: <ListinItems/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path: "/cards/:name",
    element: <CardDetails/>
  }
])


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router = {router}/>
    </ChakraProvider>
  );
}

export default App;
