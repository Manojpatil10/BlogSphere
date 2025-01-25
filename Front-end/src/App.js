import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddPost from './pages/addPost/AddPost';

function App() {

  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/addPost',
      element: <AddPost />
    },
  ])

  return (
    <>
      <RouterProvider router={myRouter}></RouterProvider>
    </>
  );
}

export default App;


