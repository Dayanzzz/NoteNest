import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesPage from '../components/NotesPage/NotesLanding';
import Layout from './Layout';
import HomePage from '../components/Homepage/HomePage';
import {CreateTask, TasksList, SingleTaskView} from '../components/Tasks/generalTask';

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
        path:"tasks",
        element: <CreateTask />
      },
      {
        path:"tasks/list",
        element: <TasksList />

      },
      {
        path:"tasks/:taskId",
        element: <SingleTaskView />
      }
    ],
  },
]);
