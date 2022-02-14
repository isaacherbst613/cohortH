import { useNavigate,Outlet } from 'react-router-dom';
import './header.css';

export default function Header() {

  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1>Welcome to my Blog</h1>
        <br />
        <h5 id="home" onClick={()=>navigate(`/`)}>Home</h5>
      </div>
      <Outlet />
    </>
  );
}

