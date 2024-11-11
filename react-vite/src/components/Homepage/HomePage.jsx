import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebooks } from "../../redux/notebooks";
import { FaBook } from "react-icons/fa";
import dummyText from "../../../src/components/Homepage/DummyText";
import Sidebar from "../Sidebar/Sidebar";

function HomePage() {
  const dispatch = useDispatch();
  const notebooks = useSelector((state) => state.notebooks.notebooks);

  useEffect(() => { 
    dispatch(getAllNotebooks());
}, [dispatch]);


  return (
    <div className="page-wrapper">
      <Sidebar />
      {/* NavBar End */}
      <div className="content-wrapper">
        <div className="sign-in-icon-area">
            <div className="sign-in-icon"> </div>
        </div>
        <div className="note-books-area">
            <h1 className="notebook-header">NOTEBOOKS</h1>
            <div className="notebooks-populated-area">
              {notebooks.slice(0, 5).map((notebook) => (
                <div className="notebook-instance" key={notebook.id}>
                  <h1 className="notebook-icon"><FaBook /></h1>
                  <h3>{notebook.name}</h3>                
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
