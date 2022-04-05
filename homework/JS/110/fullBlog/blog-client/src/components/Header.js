import { useNavigate,Outlet } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {

  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1>Welcome to my Blog</h1>
        <br />
        <div className="header-buttons">
        <h5 id="home" onClick={()=>navigate(`/`)}>Home</h5>
        <h5 id="home" onClick={()=>navigate(`/addPost`)}>Write New Post</h5>
        <h5 id="home" onClick={()=>navigate(`/signup`)}>login</h5>
        </div>
      </div>
      <Outlet />
    </>
  );
}

