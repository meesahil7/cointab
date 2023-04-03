import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleClick = (values, errors) => {
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:7000/login", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.Token) {
            localStorage.setItem("login_token", JSON.stringify(res.data.Token));
            localStorage.setItem("login_email", JSON.stringify(values.email));
          }
        })
        .then(() => navigate("/home"))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        // onSubmit={(values) => {
        //   handleSubmit(values);
        //   console.log(values);
        // }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Field name="email" type="email" placeholder="Enter email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="password" placeholder="Enter your password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button onClick={() => handleClick(values, errors)} type="button">
              Submit
            </button>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
