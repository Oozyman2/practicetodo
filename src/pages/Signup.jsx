import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ValidateEmail, ValidatePassword } from '../library/regexValidate';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setform] = useState({
    username: '',
    password1: '',
    password2: '',
    email: '',
  });
  const { loading, setloading, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEdits = (e) => {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    console.log(loading);
    e.preventDefault();
    try {
      const response = await signup(form.username, form.password1, form.email);
      if (response) {
        navigate('/Login');
        alert('Succeffully Logged in ');
        setloading(false);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const errorMessage = {
    email: 'Email is invalid',
    Password1:
      'Password should Capital Letter, Small Letter , Special Character and a Number',
    Password2: 'Passwords Do not Match',
  };

  const checkForm = () => {
    return (
      form.username &&
      ValidateEmail(form.email) &&
      form.password1 == form.password2 &&
      ValidatePassword(form.password1)
    );
  };
  return (
    <section className=''>
      <div className='container med-h'>
        <div className='row align-items-center mt-3 '>
          <div className='col-lg-5 m-auto  mb-5 mb-lg-0'>
            <div className='card cascading-right shadow-lg bg-body-tertiary'>
              <div className='card-body px-4 py-2 shadow-5 text-start'>
                <h2 className='fw-bold py-3 mx-auto text-center'>
                  Sign up now
                </h2>
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
                          value={form.username}
                          onChange={handleEdits}
                          className='form-control'
                        />
                      </div>
                    </div>
                  </div>

                  <div data-mdb-input-init className='form-outline mb-4'>
                    <label className='form-label' for='form3Example3'>
                      Email address
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={form.email}
                      onChange={handleEdits}
                      className='form-control'
                    />
                    <sub className='errors mt-2 email-error text-danger'>
                      {form.email.length == 0
                        ? ''
                        : ValidateEmail(form.email)
                        ? ''
                        : errorMessage.email}
                    </sub>
                  </div>

                  <div data-mdb-input-init className='form-outline mb-4'>
                    <label className='form-label' for='form3Example4'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password1'
                      value={form.password1}
                      onChange={handleEdits}
                      className='form-control'
                    />
                    <sub className='errors mt-2 email-error text-danger'>
                      {form.password1.length == 0
                        ? ''
                        : ValidatePassword(form.password1)
                        ? ''
                        : errorMessage.Password1}
                    </sub>
                  </div>

                  <div data-mdb-input-init className='form-outline mb-4'>
                    <label className='form-label' for='form3Example4'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      id='password2'
                      value={form.password2}
                      onChange={handleEdits}
                      className='form-control'
                    />
                    <sub className='errors mt-2 email-error text-danger'>
                      {form.password2.length == 0
                        ? ''
                        : ValidatePassword(form.password2)
                        ? ''
                        : errorMessage.Password2}
                    </sub>
                  </div>

                  <div className='form-check d-flex justify-content-start mb-4'>
                    <input
                      className='form-check-input me-2'
                      type='checkbox'
                      value=''
                      id='form2Example33'
                      checked
                    />
                    <label className='form-check-label' for='form2Example33'>
                      Subscribe to our newsletter
                    </label>
                  </div>

                  <button
                    type='submit'
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className='btn btn-primary btn-block mb-4'
                    disabled={!checkForm()}
                  >
                    <div
                      className='text-center d-flex gap-3 align-items-center justify-content-center'
                      onClick={() => setloading(true)}
                    >
                      <div>signup </div>

                      <div>
                        {loading && (
                          <div
                            class='spinner-border text-light d-flex p-1 justify-content-center align-items-center'
                            style={{
                              height: '2rem',
                              width: '2rem',
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
                    <p className='text-center'>
                      Already have an Account{' '}
                      <Link to='/login' className='fw-bold'>
                        Login
                      </Link>{' '}
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

export default Signup;
