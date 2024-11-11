import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesPage from '../components/NotesPage/NotesLanding';
import Layout from './Layout';
import HomePage from '../components/Homepage/HomePage';

import {CreateTask, TasksList, SingleTaskView} from '../components/Tasks/generalTask';

import ManageNotebooks from '../components/Notebooks/ManageNotebooks';
import CreateNotebookPage from '../components/Notebooks/CreateNotebook';
import UpdateNote from '../components/NotesPage/UpdateNote'
import CreateNotePage from '../components/NotesPage/CreateNote';


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
      {
        path: 'notebooks/manage',
        element:<ManageNotebooks />,
      },
      {
        path: 'notebooks/create',
        element:<CreateNotebookPage />,
      },
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
      },
      {
        path: "/notes/:noteId", 
        element: <UpdateNote />, 
      },
      {
        path: "newnote",
        element: <CreateNotePage/>,
      }
    ],
  },
]);
