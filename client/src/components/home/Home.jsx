import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers, setCurrentPage } from "../../redux/actions/actions";
import Cards from "../cards/Cards";
import Pagination from "../pagination/Pagination";
import FilterOrder from "../filterorder/FilterOrder";
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const currentOrder = useSelector((state) => state.currentOrder);

  const driversPerPage = 9;

  useEffect(() => {
    if (allDrivers.length === 0) {
      dispatch(getAllDrivers());
    }
  }, [dispatch, allDrivers.length]);

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const totalPages = Math.ceil(allDrivers.length / driversPerPage);

  const PreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const NextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className={style.container}>
      {typeof allDrivers[0] === "object" && "message" in allDrivers[0] ? (
        <p className={style.mensajeCentral}>{allDrivers[0].message}</p>
      ) : allDrivers.length > 0 ? (
        <div>
          <div className={style.OrderFilter}>
            <FilterOrder currentOrder={currentOrder} />
          </div>
          <div className={style.botones}>
            <button onClick={PreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <div className={style.pageNum}>{currentPage}</div>
            <button onClick={NextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          <Cards drivers={currentDrivers} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
