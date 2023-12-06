import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <p>Home</p>
      <Link to="form">Form Uncontrolled</Link>
      <br />
      <Link to="form-hook">Form Hook</Link>
    </>
  );
};

export default Home;
