import React, { useEffect, useState } from 'react';
import { addTodo, deleteTodo, completedTodo, updateTodo } from '../Redux/Action/index';
import { useDispatch, useSelector } from 'react-redux';
import { Input, initMDB } from 'mdb-ui-kit';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from 'mdb-react-ui-kit';

initMDB({ Input });

export default function Todos() {
  const [inputData, setInputData] = useState('');
  const list = useSelector((state) => state.todoReducers.todoList);
  const dispatch = useDispatch();
  var date = new Date().toLocaleDateString();
  useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(list));
  },[list])
  return (
    <>
      <section className="gradient-custom-2 vh-100">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol md="12" xl="10">
              <MDBCard className="mask-custom">
                <MDBCardBody className="p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check"
                      width="60"
                    />
                    <h2 className="my-4">TODO LIST</h2>
                  </div>
                  <div className="form-outline" data-mdb-input-init>
                    <input
                      type="text"
                      id="typeText"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      className="form-control"
                    />
                    <label className="form-label" for="typeText">
                      Add Task Details Here
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => inputData!=="" && dispatch(addTodo(inputData), setInputData(''))}
                  >
                    ADD Task
                  </button>
                  <MDBTable className="text-white mb-0">
                   <MDBTableHead>
                      <tr>
                        <th scope="col">Task Date</th>
                        <th scope="col">Task Details</th>
                        <th scope="col">Task Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {list.map((elem) => {
                        if (elem.complete) {
                          var value = `Completed on ${date}`;
                          var color = 'btn btn-success';
                        } else {
                          var value = 'Not Completed';
                          var color = 'btn btn-warning';
                        }
                        return (
                          <tr className="fw-normal">
                            <th>
                              <span className="ms-2">{date}</span>
                            </th>
                            <td className="align-middle">
                              <span>
                                <button className="btn btn-info">{elem.data}</button>
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>
                                <button className={color}>{value}</button>
                              </span>
                            </td>
                            <td className="align-middle">
                              {elem.complete || (
                                <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Done">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-floating"
                                    data-mdb-ripple-init
                                    onClick={() => dispatch(completedTodo(elem.id))}
                                  >
                                    <i class="fas fa-check"></i>
                                  </button>
                                </MDBTooltip>
                              )}
                              <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Remove">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-floating"
                                  data-mdb-ripple-init
                                  onClick={() => dispatch(deleteTodo(elem.id))}
                                >
                                  <i class="fas fa-trash"></i>
                                </button>
                              </MDBTooltip>
                              {elem.complete || (
                                <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Update Todo">
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-floating"
                                    data-mdb-ripple-init
                                    onClick={() => dispatch(updateTodo(elem.id))}
                                  >
                                    <i class="fas fa-edit"></i>
                                  </button>
                                </MDBTooltip>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
