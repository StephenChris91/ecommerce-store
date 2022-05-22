import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Components/Message";
import { Loader } from "../Components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { listMyOrders } from "../actions/orderActions";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //toastify notifcations
  const updated = () =>
    toast("Profile Updated Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      type: toast.TYPE.SUCCESS,
    });

  const updateFailed = () =>
    toast("Profile Update Failed", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      type: toast.TYPE.ERROR,
    });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: loadingError, orders } = orderListMy;
  console.log(orders);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { success } = updateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );

      updated();
    } else {
      //setMessage('Passwords do not match')
      updateFailed();
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <ToastContainer />}
        {error && <ToastContainer />}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="my-4">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrders ? (
          <Loader />
        ) : loadingError ? (
          <Message variant="danger">{loadingError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.Delivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}
