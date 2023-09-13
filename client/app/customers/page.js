'use client'

import { useState, useEffect } from "react";

import DeleteModal from "@/components/DeleteModal";
import CreateModal from "@/components/CreateUserModal";
import EditModal from "@/components/EditUserModal";

export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState('');
  const [editCustomer, setEditCustomer] = useState('');
  const [search, setSearch] = useState('');

  const getAllCustomers = async () => {
    const response = await fetch('http://localhost:5000/user/');
    const data = await response.json();
    setCustomers(data);
  }

  const deleteAction = async (id) => {
    document.getElementById('delete-user').showModal();
    setCustomer(id);
  }

  const EditAction = async (customer) => {
    document.getElementById('edit-user').showModal();
    setEditCustomer(customer);
  }


  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <section className="px-16">
      <div className="flex flex-col justify-between items-center my-10">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-sm text-gray-500">Total Customers: {customers.length}</p>
      </div>
      <div className="flex flex-1 justify-between">
        <input type="text" placeholder="Search for customer..." className="input input-bordered input-success w-full max-w-xs" onChange={(e)=>{setSearch(e.target.value)}}/>
        <button className="btn btn-success" onClick={()=>document.getElementById('create').showModal()}>Add New Customer</button>
      </div>
      <div className="divider my-5"></div>
      <div className="overflow-x-auto my-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.age}</td>
                  <td className="flex gap-5">
                    <button className="btn btn-sm btn-warning" onClick={()=>{EditAction(customer)}}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={()=>{deleteAction(customer.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <CreateModal onCreate={getAllCustomers} />
      <EditModal customer={editCustomer} onEdit={getAllCustomers} />
      <DeleteModal item={customer} onDelete={getAllCustomers} initial='user' />

    </section>
  )
}
