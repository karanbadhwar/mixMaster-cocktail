import React from "react";
import Wrapper from "../assets/wrappers/SearchForm";
import { Form, useNavigation } from "react-router-dom";

function SearchForm({ searchTerm }: { searchTerm: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form">
        <input
          type="search"
          name="search"
          id=""
          className="form-input"
          placeholder="Search"
          // value={searchTerm}
          defaultValue={searchTerm}
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          Search
        </button>
      </Form>
    </Wrapper>
  );
}

export default SearchForm;
