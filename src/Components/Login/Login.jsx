import React, { useState } from "react";
import "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.jpg";

export default function Login() {
  let navigate = useNavigate();
  let [err, setErr] = useState(null);
  async function signIn(values) {
    let { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      values
    );
    console.log(data);
    if (data.msg == "done") {
      navigate("/home");
      localStorage.setItem("userToken", `3b8ny__${data.token}`);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must be start with capital letter"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signIn,
  });

  return (
    <>
      <div className="d-flex mt-5  ">
        <div className="col-md-8">
          <img className="w-100" src={loginImg} alt="" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className=" d-flex flex-column col-md-4 "
        >
          <h3>Sign In</h3>
          {err ? <div className="text-danger">{err}</div> : ""}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="email">email</label>
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="password"
              id="password"
              placeholder=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="password">password</label>
            {formik.errors.password && formik.touched.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>
          <div>
            <button
              style={{ background: "#9e51d6" }}
              type="submit"
              className="btn w-100 ms-auto text-light mt-3"
            >
              Sign up
            </button>
            <Link to={'/register'}>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
