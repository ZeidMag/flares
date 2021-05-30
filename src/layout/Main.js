import Navbar from './navbar/Navbar';

const Main = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ height: '4rem' }}></div>
      {children}
    </>
  );
};

export default Main;
