import React from "react";
import AddExpense from "./components/AddExpense";
import ListExpense from "./components/ListExpense";
import ExpenseData from "./components/ExpenseData";
import Counter from "./concept/Counter";

import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Container className="mt-2 mb-2">
        <Row>
          <Col>
            <ExpenseData />
            <AddExpense />
            <ListExpense />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
