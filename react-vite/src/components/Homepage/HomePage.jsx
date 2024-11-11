import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebooks } from "../../redux/notebooks";
//import Homepage from "../../../src/components/Homepage/Homepage.css"
import { FaBook } from "react-icons/fa";
import dummyText from "../../../src/components/Homepage/DummyText";


function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const notebooks = useSelector((state) => state.notebooks.notebooks);
  //Grab the user's Notebooks from the store
  useEffect(() => { 
    dispatch(getAllNotebooks());
}, [dispatch]);
  // Display up to 8 notebooks

console.log("notebooks:",notebooks);

  //Grab Notes from the store
  //display up to 12 notes. Let page scroll

  return (
    <div className="page-wrapper">
      <div className="nav-bar">
        <div className="user-name">
          <h2>{ !user? "Welcome" : user.username}</h2>
        </div>
        <div className="nav-btn-area">
          <div>Notebooks</div><div>+</div>
        </div>
        <div className="nav-btn-area">
          <div>Notebooks</div><div>+</div>
        </div>
        <div className="nav-btn-area">
          <div>Notebooks</div><div>+</div>
        </div>
        <div className="nav-btn-area">
          <div>Notebooks</div><div>+</div>
        </div>
        <div className="nav-btn-area">
          <div>Notebooks</div><div>+</div>
        </div>
      </div>
      {/* NavBar End */}
      <div className="content-wrapper">
        <div className="sign-in-icon-area">
            <div className="sign-in-icon"> </div>
        </div>
        <div className="note-books-area">
            <h1 className="notebook-header">NOTEBOOKS</h1>
            <div className="notebooks-populated-area">
              {notebooks.map((notebook) => (
                <div key={notebook.id}>
                  <h1 className="notebook-icon"><FaBook /></h1>
                  <h2>{notebook.name}</h2>                
                </div>
              ))}
              </div>
        </div>
        <div className="note-area-wrapper">
          <div className="single-note">
            <h2 className="note-header">Note Title</h2>
            <p>{dummyText}</p>
          </div>
          <div className="single-note">
            <h2 className="note-header">Note Title</h2>
            <p>{dummyText}</p>
          </div>
          <div className="single-note">
            <h2 className="note-header">Note Title</h2>
            <p>{dummyText}</p>
          </div>
          <div className="single-note">
            <h2 className="note-header">Note Title</h2>
            <p>{dummyText}</p>
          </div>
          <div className="single-note">
            <h2 className="note-header">Note Title</h2>
            <p>{dummyText}</p>
          </div>
        </div>
      </div>
    </div>

)
}

export default HomePage;
