import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Home = () => {
  const imgBase64 = useAppSelector(
    (state) => state.userForm.userForm.file
  ) as string;

  return (
    <>
      <p>Home</p>
      <Link to="form">Form Uncontrolled</Link>
      <br />
      <Link to="form-hook">Form Hook</Link>
      <br />
      {imgBase64 && <img src={imgBase64} alt={`user's avatar`}></img>}
    </>
  );
};

export default Home;
