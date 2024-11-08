import { NavLink } from 'react-router-dom';
import { useEffect,useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateNotebook from '../Notebooks/CreateNotebook';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SiderbarStyle from "../../../src/components/Sidebar/SidebarStyle.css"

function Sidebar(){
    const user = useSelector((store) => store.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };
      
      useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
      const closeMenu = () => setShowMenu(false);
    
      const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
      };

    return(
        <div className="sidebar">
            <div className="user-name">
                <h2>{ !user? "Welcome" : `Hi, ${user.username}`}</h2>
            </div>
            <div className="sidebar-btn-area">
                <NavLink to="/notebooks/manage" title="See Your Notebooks">Notebooks</NavLink>
                <div title="Create a new Notebook">
                <>
      <button onClick={toggleMenu}>
        +
      </button>
      {showMenu && (
        <div className={"create-notebook-menu"} ref={ulRef}>
          {user ? (
            <>
                <h1>Create a New Notebook</h1>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
            <h1>Login to Create a Notebook</h1>
            </>
          )}
        </div>
      )}
    </>



                </div>
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