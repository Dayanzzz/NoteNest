import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from "../../../src/components/Homepage/Homepage.css"

function Sidebar(){
    const user = useSelector((store) => store.session.user);

    return(
        <div className="sidebar">
            <div className="user-name">
                <h2>{ !user? "Welcome" : `Hi, ${user.username}`}</h2>
            </div>
            <div className="sidebar-btn-area">
                <NavLink to="/" title="See Your Notebooks">Notebooks</NavLink>
                <NavLink title="Create a new Notebook">+</NavLink>
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/notes" title="See Your Notes">Notes</NavLink>
            <NavLink title="Create a new Note">+</NavLink>
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/tasks" title="See Your Tasks">Tasks</NavLink>
            <NavLink title="Create a new Task">+</NavLink>
            </div>
            <div className="sidebar-btn-area">
            <NavLink to="/tags" title="See Your Tags">Tags</NavLink>
            <NavLink title="Create a new Tag">+</NavLink>
            </div>
      </div>
    )
}

export default Sidebar;