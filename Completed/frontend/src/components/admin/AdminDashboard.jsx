import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {

  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])

  let navigate = useNavigate()

  async function getCustomers() {
    await axios.get('http://localhost:8089')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err))
  }

  async function getEmployees() {
    await axios.get('http://localhost:8089/getEmployee')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getCustomers()
    getEmployees()
  }, [])

  return (
    <div
      className="container-fluid"
      style={{
        background:
          "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lawpracticetoday.org%2Fwp-content%2Fuploads%2F2020%2F08%2Fhr-mgmt-software.png&f=1&nofb=1)",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="row" style={{}}>
        <h1 className="text-center mt-5"> Admin Dashboard </h1>
        <div className="row vh-100 mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-4"
            onClick={() => {
              navigate('/get-all-customers')
            }}
          >
            <div>
              <div className="row btn btn-outline-dark border border-3 border-dark rounded-4 mx-1" style={{ backgroundColor: "#cccccc" }}>
                <h2 className=" text-center"> Customer Management </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  fill="currentColor"
                  class="bi bi-person-badge mt-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <h5 className='my-5'> Number of Existing Customers: {customers.length} </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              onClick={() => {
                navigate('/get-all-employees')
              }}
            >
              <div className="row btn btn-outline-dark border border-3 border-dark rounded-4 mx-1" style={{ backgroundColor: "#ffddaa" }}>
                <h2 className=" text-center"> Employee Management </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  fill="currentColor"
                  class="bi bi-file-earmark-person mt-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                <h5 className='my-5'> Number of Existing Employees: {employees.length} </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
