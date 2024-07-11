import React, { useState } from "react";
import "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  let navigate=useNavigate()
  let [err, setErr] = useState(null);
  async function signUp(values) {
    let { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .catch((err) => {
        setErr(err.response.data.msg);
      });
      console.log(data)
      if(data.msg==='done'){
        navigate('/login')

      }

      // "$2b$08$a7ef2iuyclk9u3KcKx9k..3fRwWxqR2KqiGXYDZ.5e8vMPbY839b6"

  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min length is 3 chars")
      .max(8, "max length is 8 chars"),
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z]/, "password must be start with capital letter"),
    age: Yup.number().required("age is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}/, "please enter egyption number phone"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: signUp,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-75 d-flex flex-column justify-content-center  mt-5 mx-5"
      >
        <h3>Sign Up</h3>
        {err ? <div className="text-danger">{err}</div> : ""}

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder=""
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name">Name</label>
          {formik.errors.name && formik.touched.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
        </div>
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
        <div className="form-floating mb-3">
          <input
            type="number"
            inputMode="numeric"
            className="form-control"
            name="age"
            id="age"
            placeholder=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          <label htmlFor="age">age</label>
          {formik.errors.age && formik.touched.age ? (
            <div className="text-danger">{formik.errors.age}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            placeholder=""
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="phone">phone</label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-danger">{formik.errors.phone}</div>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex align-items-center gap-3">
        <button type="submit" className="btn btn-primary w-25 ms-auto">
          Sign up
        </button>
        <Link to={'/login'}>Have Account</Link>
        </div>

      </form>
    </>
  );
}
