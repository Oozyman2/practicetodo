const ViewTodo = ({ removeTodo }) => {
  return (
    <div className='bg-light d-flex gap-3 justify-content-center'>
      <div
        class='modal fade'
        id='deleteModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <h1
              class='modal-title display-6 fw-bold fs-3 mt-3 text-center'
              id='exampleModalLabel'
            >
              Confirmation!!!
            </h1>

            <div>
              <div className='display-6 fs-4 my-3 text-lowercase text-center'>
                Are you Sure, You Want To Delete This Todo
              </div>
            </div>
            <div class='d-flex justify-content-center my-3 gap-3 m-auto text-center'>
              <button
                type='button'
                class='btn btn-danger fs-5 px-4'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={removeTodo}
              >
                Yes
              </button>
              <button
                type='button'
                className='btn btn btn-success fs-5 px-4'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTodo;
