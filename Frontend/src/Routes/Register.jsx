import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimum eight characters, at least one letter, one number and one special character"
    ),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (values, errors) => {
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      axios
        .post("https://crimson-reindeer-gown.cyclic.app/register", values)
        .then((res) => {
          console.log(res.data);
          swal(res.data.message, "", "success");
          setLoading(false);
          console.log(res.data);
        })
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Signup</h1>
      <Formik
        id="form"
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        // onSubmit={(values) => {
        //   handleSubmit(values);
        //   console.log(values);
        // }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Field name="name" placeholder="Enter your name" />
            {errors.name && touched.name ? (
              <div className="alert">{errors.name}</div>
            ) : null}
            <Field name="email" type="email" placeholder="Enter email" />
            {errors.email && touched.email ? (
              <div className="alert">{errors.email}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Enter a strong password"
            />
            {errors.password && touched.password ? (
              <div className="alert">{errors.password}</div>
            ) : null}
            <button onClick={() => handleClick(values, errors)} type="button">
              Submit
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
