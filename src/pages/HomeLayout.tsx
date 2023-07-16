import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? <div className="loading" /> : <Outlet />}
      </section>
    </>
  );
}

export default HomeLayout;

// We can pass any thing in the outlet and can use it in any of the component regardless how deep they are nested,
// <Outlet context={{data="karan"}}/>
// const {data} = useOutletContext() Hook to retrieve data
