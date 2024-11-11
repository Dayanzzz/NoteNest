import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import NotesPage from '../components/NotesPage/NotesLanding';
import Layout from './Layout';
import HomePage from '../components/Homepage/HomePage';

<<<<<<< HEAD
import {CreateTask, TasksList, SingleTaskView} from '../components/Tasks/generalTask';
=======
import { ViewAllTasks } from '../components/Tasks/ViewAllTasks';
import { CreateTask } from '../components/Tasks/CreateTasks';
import { UpdateTask } from '../components/Tasks/UpdateTasks';
import { SingleTaskDetail } from '../components/Tasks/SingleTaskView';
>>>>>>> blair-branch

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
<<<<<<< HEAD
      {
        path: 'notebooks/manage',
        element:<ManageNotebooks />,
      },
      {
        path: 'notebooks/create',
        element:<CreateNotebookPage />,
      },
=======
      // {
        
      //   path: '/notes/:noteId/edit', 
      //   element: <UpdateNote />, 
      
      // }
      
>>>>>>> blair-branch
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
<<<<<<< HEAD
        element: <SingleTaskView />
      },
      {
        path: "/notes/:noteId", 
        element: <UpdateNote />, 
      },
      {
        path: "newnote",
        element: <CreateNotePage/>,
=======
        element: <SingleTaskDetail />
      },
      {
        path:"tasks/:taskId/edit",
        element: <UpdateTask />
>>>>>>> blair-branch
      }
    ],
  },
]);
