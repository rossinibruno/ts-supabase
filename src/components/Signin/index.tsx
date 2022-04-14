import { useFormik } from 'formik';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();

  //@ts-ignore
  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      const { error } = await signin({ email, password });

      if (error) console.log(error);

      navigate(from, { replace: true });
    }
  });

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Login</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
}
