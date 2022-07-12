import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

export const AllCustomers = () => {



  async function getAllCustomers() {




    //     .then(res => setCustomers(res.data))
    // .catch(err => console.error(err))
  }

  async function deleteCustomer(id) {
    await axios.delete(`http://localhost:8089/deleteEmployee/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))



    Swal.fire({
      title: 'Deleted Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) => {
      Swal.fire((window.location = "/get-all-employees"));
    });
  }

  useEffect(() => {
    getAllCustomers()
  }, [])

  return (
    <div>
      <table class="container table table-hover mt-4">
        <thead>
          <tr>
            <th> First Name </th>
            <th> Last Name </th>
            <th> Designation </th>
            <th> Address </th>
            <th> Email </th>
            <th> Date of Birth </th>
            <th> Salary </th>
            <th> Update </th>
            <th> Delete </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td> {customer.firstName} </td>
                <td> {customer.lastName} </td>
                <td> {customer.designation} </td>
                <td> {customer.address} </td>
                <td> {customer.email} </td>
                <td> {customer.dob} </td>
                <td> {customer.salary} </td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate(`/updateCustomer/${customer.id}`);
                    }}
                  >
                    UPDATE
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      Swal.fire({
                        title: "Warning!",
                        text: "Do you want to delete the Customer?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteCustomer(customer.id);
                        } else {
                        }
                      });
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
