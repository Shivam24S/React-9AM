import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

import { Container, Row, Col } from "react-bootstrap";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineAddTask } from "react-icons/md";

const ExpenseData = () => {
  const { balance, credit, debit } = useContext(ExpenseContext);

  return (
    <>
      <div className="card shadow p-5 m-3">
        <h1 className="text-center mt-2">
          {" "}
          <RiMoneyRupeeCircleLine /> Expense Tracker
        </h1>

        <Container>
          <Row>
            <Col className="d-flex  gap-3 justify-content-center align-items-center mt-3">
              <div className="card shadow p-4 d-flex justify-content-center align-items-center">
                <h3>
                  {" "}
                  <MdOutlineAddTask /> Credit
                </h3>
                <h1 className="text-success"> ₹ {credit}</h1>
              </div>

              <div className="card shadow p-4 d-flex justify-content-center align-items-center">
                <h5>Debit</h5>
                <h1 className="text-danger"> ₹ {debit}</h1>
              </div>

              <div className="card shadow p-4 d-flex justify-content-center align-items-center">
                <h5>Balance</h5>
                <h1 className="text-primary"> ₹ {balance}</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ExpenseData;
