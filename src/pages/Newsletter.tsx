import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(newsletterUrl, data);
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }

    return error;
  }
};

function Newsletter() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form className="form" method="post">
      <h4
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Our Newsletter
      </h4>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input type="text" name="name" id="name" required />
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input type="text" name="lastName" id="lastName" required />
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue="test@test.com"
        />
      </div>
      <button
        className="btn btn-block"
        type="submit"
        style={{
          marginTop: "0.5rem",
        }}
        disabled={isSubmitting}
      >
        Submit
      </button>
    </Form>
  );
}

export default Newsletter;
