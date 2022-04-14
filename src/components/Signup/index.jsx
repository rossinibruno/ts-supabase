import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      const { error } = await signup({ email, password });

      if (error) {
        alert('error signup in');
      }

      navigate('/', { replace: true });
    }
  });

  return (
    <>
      {user}
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
        <button type="submit">Registrar</button>
        <Link to="/signin">Log In</Link>
      </form>
    </>
  );
}
