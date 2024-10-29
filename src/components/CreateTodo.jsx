import { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../context/Productcontext';
const CreateTodo = () => {
  const { products, loading, addProducts, setLoading } =
    useContext(ProductsContext);
  const [storeData, setstoreData] = useState([]);
  const [todos, settodos] = useState({
    name: '',
    description: '',
    status: false,
  });

  const resetTodo = () => {
    settodos({
      name: '',
      description: '',
      status: false,
    });
  };
  console.log(loading);

  const addTodo = async () => {
    setLoading(true);
    const todoData = {
      todo_name: todos.name,
      todo_desc: todos.description,
      todo_status: todos.status,
    };
    const response = await addProducts(todoData);
    console.log(response);
    console.log(loading);
    resetTodo();
    // setstoreData((prev) => [...prev, response.data]);
  };

  const handleEdits = (e) => {
    settodos((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div
      class='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabindex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h1 class='modal-title fs-5' id='staticBackdropLabel'>
              Create New Todo
            </h1>
            <button
              type='button'
              class='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div class='modal-body'>
            <form>
              <div class='mb-3'>
                <label for='exampleInputEmail1' class='form-label'>
                  Enter Todo Name
                </label>
                <input
                  type='text'
                  class='form-control'
                  id='name'
                  value={todos.name}
                  onChange={handleEdits}
                />
              </div>
              <div className='mb-3'>
                <label for='exampleInputEmail1' class='form-label'>
                  Select Todo Category
                </label>
                <select class='form-select' aria-label='Default select example'>
                  <option selected>None</option>

                  <option value='personal development'>
                    Personal Development
                  </option>
                  <option value='coding'>Coding</option>
                  <option value='work'>Work</option>
                </select>
              </div>
              <div class='mb-3'>
                <label for='exampleFormControlTextarea1' class='form-label'>
                  Enter Todo Description
                </label>
                <textarea
                  className='form-control'
                  value={todos.description}
                  onChange={handleEdits}
                  id='description'
                  rows='3'
                ></textarea>
              </div>
              <div class='form-check'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  value={todos.status}
                  onChange={handleEdits}
                  id='status flexCheckChecked'
                />
                <label class='form-check-label' for='flexCheckChecked'>
                  Uncompleted
                </label>
              </div>
            </form>
          </div>
          <div class='modal-footer '>
            <button
              type='button'
              class='btn btn-success d-flex gap-2 align-items-center'
              onClick={addTodo}
            >
              <div className=''>Add Todo </div>
              {loading && (
                <div
                  class='spinner-border p-1'
                  style={{ height: '1.5rem', width: '1.5rem' }}
                  role='status'
                >
                  <span class='visually-hidden'>Loading...</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
