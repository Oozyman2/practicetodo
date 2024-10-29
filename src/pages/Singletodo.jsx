import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../context/Productcontext';
import { convertDateFormat } from '../utils/library';
import ViewTodo from '../components/ViewTodo';
import arrowLeft from '../../public/arrow-left.svg';

const Singletodo = () => {
  const [editState, seteditState] = useState(false);
  const { getSingleProduct, loading, product, setLoading, deleteSingleTodo } =
    useContext(ProductsContext);
  const [singleProduct, setsingleProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        let data = await getSingleProduct(id, 'GET');
        setsingleProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSingleProduct();
  }, [id]);
  console.log(singleProduct);

  if (loading == true) {
    return (
      <div
        class='spinner-border text-warning d-flex justify-content-center align-items-center'
        style={{
          height: '10rem',
          width: '10rem',
          borderWidth: '20px',
          margin: '40vh auto',
        }}
        role='status'
      >
        <span class='visually-hidden'>Loading...</span>
      </div>
    );
  }

  const EditTodo = () => {
    seteditState(true);
  };

  const handleEdits = (e) => {
    setsingleProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const updateTodo = async () => {
    setLoading(true);
    seteditState(false);
    const data = await getSingleProduct(id, 'PUT', singleProduct);
    console.log(data);
  };

  const deleteTodo = () => {
    deleteSingleTodo(id);
    navigate('/');
  };

  return (
    <section className='p-4 shadow-lg rounded-3 w-50 d-flex  justify-content-center m-auto mt-5'>
      <ViewTodo removeTodo={deleteTodo} />
      {!loading && (
        <div className='w-100'>
          <div className=''>
            <button
              onClick={() => navigate(-1)}
              className='btn btn-warning rounded-circle'
            >
              <img src={arrowLeft} alt='' />
            </button>
            <p className='display-5 text-center'>Todo Details</p>
          </div>
          <div className='d-flex flex-column '>
            <p className='d-flex gap-2 align-items-center'>
              <span className='px-2 py-1 display-6 fw-bold  bg-black text-warning fs-6 text-nowrap'>
                Task Name
              </span>

              {!editState ? (
                <span className='fs-6'>{singleProduct?.todo_name}</span>
              ) : (
                <input
                  type='text'
                  className='form-control'
                  id='todo_name'
                  onChange={handleEdits}
                  value={singleProduct.todo_name}
                />
              )}
            </p>

            <p className='d-flex gap-2 align-items-center'>
              <span className='px-2 d-flex py-1 display-6 fw-bold bg-black text-warning fs-6'>
                Description
              </span>
              {!editState ? (
                <span>{singleProduct?.todo_desc}</span>
              ) : (
                <input
                  type='text'
                  className='form-control'
                  id='todo_desc'
                  onChange={handleEdits}
                  value={singleProduct.todo_desc}
                />
              )}
            </p>
            <p className='d-flex gap-2 align-items-center'>
              <span className='px-2 py-1 display-6 fw-bold  bg-black text-warning fs-6'>
                Time
              </span>
              {!editState ? (
                <span>{convertDateFormat(singleProduct?.time_created)}</span>
              ) : (
                <input
                  className='form-control'
                  id='time_created'
                  type='datetime-local'
                  onChange={handleEdits}
                  value={singleProduct.time_created}
                />
              )}
            </p>
            <p className='d-flex gap-2 align-items-center'>
              <span className='px-2 py-1  display-6 fw-bold  bg-black text-warning fs-6'>
                Status
              </span>
              <span>
                {!editState ? (
                  <>
                    {singleProduct?.todo_status ? 'Completed' : 'Uncomepleted'}
                  </>
                ) : (
                  <select
                    name=''
                    id='todo_status'
                    className='form-form-check-input'
                    onChange={handleEdits}
                    value={singleProduct.todo_status.toString()}
                  >
                    <option value=''></option>
                    <option value={true}>Completed</option>
                    <option value={false}>Uncompleted</option>
                  </select>
                )}
              </span>
            </p>
            <p className='d-flex gap-2 align-items-center'>
              <span className='px-2 py-1  display-6 fw-bold  bg-black text-warning fs-6'>
                Category
              </span>
              {!editState ? (
                <span>Coding</span>
              ) : (
                <select class='form-select' aria-label='Default select example'>
                  <option selected>None</option>

                  <option value='personal development'>
                    Personal Development
                  </option>
                  <option value='coding'>Coding</option>
                  <option value='work'>Work</option>
                </select>
              )}
            </p>
          </div>

          <div className='d-flex gap-2 justify-content-center'>
            {!editState ? (
              <button
                className='d-block btn btn-warning rounded-5 px-3 '
                onClick={EditTodo}
              >
                Edit
              </button>
            ) : (
              <button
                className='d-block btn btn-warning rounded-5 px-3 '
                onClick={updateTodo}
              >
                Update
              </button>
            )}

            <button
              className='d-block btn btn-danger rounded-5 px-3'
              data-bs-toggle='modal'
              data-bs-target='#deleteModal'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Singletodo;
