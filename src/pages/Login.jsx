import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [userData, setuserData] = useState({
    username: '',
    password: '',
  });
  const { login, loading, setloading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEdits = (e) => {
    setuserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(userData.username, userData.password);
      if (response) {
        navigate('/'); // Navigate immediately after a successful login
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setloading(false); // Ensure loading is set to false after login attempt
    }
  };

  return (
    <section className=''>
      <div className='container med-h'>
        <div className='row align-items-center mt-5 '>
          <div className='col-lg-5 m-auto mb-5 mb-lg-0'>
            <div className='card cascading-right shadow-lg bg-body-tertiary'>
              <div className='card-body px-4 py-2 shadow-5 text-start'>
                <h2 className='fw-bold py-3 mx-auto text-center'>Login Now</h2>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-md-12 mb-4'>
                      <div data-mdb-input-init className='form-outline'>
                        <label
                          className=' text-end text-start'
                          for='form3Example1'
                        >
                          Username
                        </label>
                        <input
                          type='text'
                          id='username'
                          value={userData.username}
                          onChange={handleEdits}
                          className='form-control'
                        />
                      </div>
                    </div>
                  </div>

                  <div data-mdb-input-init className='form-outline mb-4'>
                    <label className='form-label' for='form3Example4'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      value={userData.password}
                      onChange={handleEdits}
                      className='form-control'
                    />
                  </div>

                  <button
                    type='submit'
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className='btn btn-primary btn-block mb-4'
                  >
                    <div
                      className='text-center d-flex gap-3 align-items-center justify-content-center'
                      onClick={() => setloading(true)}
                    >
                      <div>Login </div>

                      <div>
                        {loading == true && (
                          <div
                            class='spinner-border text-light d-flex p-1 justify-content-center align-items-center'
                            style={{
                              height: '1.7rem',
                              width: '1.7rem',
                              borderWidth: '4px',
                              margin: 'auto',
                            }}
                            role='status'
                          >
                            <span class='visually-hidden'>Loading...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  <div className='text-start'>
                    <p>
                      Dont Have an Account{' '}
                      <span>
                        {' '}
                        <Link to='/signup' className='fw-bold'>
                          {' '}
                          Sign Up{' '}
                        </Link>{' '}
                      </span>{' '}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
