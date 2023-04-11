import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Audio } from "react-loader-spinner";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (values, errors) => {
    setLoading(true);
    if (Object.keys(errors).length === 0) {
      axios
        .post("https://crimson-reindeer-gown.cyclic.app/login", values)
        .then((res) => {
          // console.log(res.data);
          setLoading(false);
          if (res.data.err || res.data.warning) {
            swal("Error", res.data.err || res.data.warning, "error");
          } else {
            swal(
              "Message:",
              res.data.message,
              "success"
            );
          }
          if (res.data.Token) {
            localStorage.setItem("login_token", JSON.stringify(res.data.Token));
            localStorage.setItem("login_email", JSON.stringify(values.email));

            navigate("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      {loading ? (
        <Audio color="white" />
      ) : (
        <div>
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
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <button
                  onClick={() => handleClick(values, errors)}
                  type="button"
                >
                  Submit
                </button>
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Login;
