import { useState, useContext } from 'react';
import ViewTodo from '../components/ViewTodo';
import Todolist from '../components/Todolist';
import plus from '../../public/plus.svg';
import CreateTodo from '../components/CreateTodo';
import { AuthContext } from '../context/Authcontext';
const Todopage = () => {
  const [Datas, setDatas] = useState([]);
  const { logout, setloading, loading } = useContext(AuthContext);

  if (loading) {
    return '...laading';
  }
  return (
    <>
      {!loading && (
        <section className=''>
          <button
            className='btn btn-outline-danger rounded-2 px-2 py-2 position-absolute top-0 end-0 m-4'
            onClick={logout}
          >
            Logout
          </button>
          <ViewTodo />
          <CreateTodo storeData={setDatas} data={Datas} />
          <Todolist data={Datas} />
          <button
            type='button'
            className='btn btn-primary rounded-circle p-2 position-fixed bottom-0 end-0 m-5 '
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
          >
            <img src={plus} alt='' />
          </button>
        </section>
      )}
    </>
  );
};
export default Todopage;
