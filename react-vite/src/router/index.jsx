import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesPage from '../components/NotesPage/NotesLanding';
import Layout from './Layout';
import HomePage from '../components/Homepage/HomePage';

import { ViewAllTasks } from '../components/Tasks/ViewAllTasks';
import { CreateTask } from '../components/Tasks/CreateTasks';
import { UpdateTask } from '../components/Tasks/UpdateTasks';
import { SingleTaskDetail } from '../components/Tasks/SingleTaskView';

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
        path:"tasks/",
        element: <ViewAllTasks />

      },
      {
        path:"tasks/new",
        element: <CreateTask />
      },
      {
        path:"tasks/:taskId",
        element: <SingleTaskDetail />
      },
      {
        path:"tasks/:taskId/edit",
        element: <UpdateTask />
      }
    ],
  },
]);
