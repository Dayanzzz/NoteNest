import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesPage from '../components/NotesPage/NotesLanding';
import Layout from './Layout';
import HomePage from '../components/Homepage/HomePage';
import Tags from '../components/Tags/Tags';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"notes",
        element: <NotesPage/>,
      },
      // {
        
      //   path: '/notes/:noteId/edit', 
      //   element: <UpdateNote />, 
      
      // }
      {
        path: "tags", // <-- Define the route with noteId parameter
        element: <Tags />,            // <-- Render Tags component on this route
      },
    ],
  },
]);