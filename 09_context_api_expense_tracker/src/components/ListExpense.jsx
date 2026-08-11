import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { VscClearAll } from "react-icons/vsc";

const ListExpense = () => {
  const { expenseList, deleteExpense, handleExpenseEdit } =
    useContext(ExpenseContext);

  const [expenseQuery, setExpenseQuery] = useState({
    title: "",
    type: "all",
    category: "all",
    sort: "",
  });

  const handleChange = (field, e) => {
    setExpenseQuery((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const filterList = expenseList
    .filter((l) =>
      l.title.toLowerCase().includes(expenseQuery.title.toLowerCase()),
    )
    .filter((l) =>
      expenseQuery.type === "all" ? true : l.type === expenseQuery.type,
    )
    .filter((l) =>
      expenseQuery.category === "all"
        ? true
        : l.category === expenseQuery.category,
    );

  const sortedList = [...filterList].sort((a, b) => {
    if (expenseQuery.sort === "asc") {
      return b.id - a.id;
    }

    if (expenseQuery.sort === "desc") {
      return a.id - b.id;
    }

    if (expenseQuery.sort === "moneyAsc") {
      return Number(a.amount) - Number(b.amount);
    }

    if (expenseQuery.sort === "moneyDsc") {
      return Number(b.amount) - Number(a.amount);
    }
  });

  const clearFilter = () => {
    setExpenseQuery({
      title: "",
      type: "all",
      category: "all",
      sort: "",
    });
  };

  return (
    <>
      <Container className="card p-4 mt-3">
        <Form>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter title"
                  value={expenseQuery.title}
                  onChange={(e) => handleChange("title", e)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Select
                  name="Expense Type"
                  id="type"
                  value={expenseQuery.type}
                  onChange={(e) => handleChange("type", e)}
                >
                  <option value="all" selected>
                    Expense Type
                  </option>
                  <option value="credit">credit</option>
                  <option value="debit">debit</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Category</Form.Label>

                <Form.Select
                  name="category"
                  id="category"
                  value={expenseQuery.category}
                  onChange={(e) => handleChange("category", e)}
                >
                  <option value="all" selected>
                    Expense category
                  </option>
                  <option value="Money Transfer">Money Transfer</option>
                  <option value="Cash Withdrawal">Cash Withdrawal</option>
                  <option value="General Expense">General Expense</option>
                  <option value="Food&Dining">Food&Dining</option>
                  <option value="HealthCare">HealthCare</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  name="sort"
                  id="sort"
                  value={expenseQuery.sort}
                  onChange={(e) => handleChange("sort", e)}
                >
                  <option value="asc">ascending</option>
                  <option value="desc">descending</option>
                  <option value="moneyAsc">Money Ascending</option>
                  <option value="moneyDsc">Money Descending</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Button
                className="mt-4 w-100"
                variant="outline-secondary"
                onClick={clearFilter}
              >
                <VscClearAll /> Clear Filters
              </Button>
            </Col>
          </Row>
        </Form>

        {sortedList.length > 0 ? (
          <table className="table table-stripped table-hover table-bordered mt-4">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Expense Type</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((data, index) => {
                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.amount}</td>
                    <td>{data.date}</td>
                    <td>{data.category}</td>
                    <td>
                      {data.type === "credit" ? (
                        <Badge pill bg="success">
                          {data.type}
                        </Badge>
                      ) : (
                        <Badge pill bg="danger">
                          {data.type}
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        className="btn-warning"
                        onClick={() => handleExpenseEdit(data.id)}
                      >
                        <CiEdit fontSize={20} /> Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn-danger"
                        onClick={() => deleteExpense(data.id)}
                      >
                        <MdDelete fontSize={20} /> Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center mt-5">
            {" "}
            <FaBoxOpen /> No Data Found
          </h1>
        )}
      </Container>
    </>
  );
};

export default ListExpense;
