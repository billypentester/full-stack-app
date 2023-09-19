'use client'

import { useState, useEffect } from "react";

import CreateModal from "@/components/CreateOrderModal"
import EditModal from "@/components/EditOrderModal"
import DeleteModal from "@/components/DeleteModal";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState('');
  const [editOrder, setEditOrder] = useState('');
  const [search, setSearch] = useState('');

  const getAllOrders = async () => {
    const response = await fetch('http://localhost:5000/order/');
    const data = await response.json();
    setOrders(data);
  }

  const deleteAction = async (id) => {
    document.getElementById('delete-order').showModal();
    setOrder(id);
  }

  const EditAction = async (orders) => {
    document.getElementById('edit').showModal();
    setEditOrder(orders);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <section className="px-16">
      <div className="flex flex-col justify-between items-center my-10">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-sm text-gray-500">Total Orders: {orders.length}</p>
      </div>
      <div className="flex flex-1 justify-between">
        {/* <input type="text" placeholder="Search for order..." className="input input-bordered input-success w-full max-w-xs" onChange={(e)=>{setSearch(e.target.value)}}/> */}
        <button className="btn btn-success" onClick={()=>document.getElementById('create').showModal()}>Create New Order</button>
      </div>
      <div className="divider my-5"></div>
      {
        orders.length > 0 ?
        <div className="overflow-x-auto my-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.product.name}</td>
                  <td>{order.product.price}</td>
                  <td>{order.status}</td>
                  <td className="flex gap-5">
                    <button className="btn btn-sm btn-warning" onClick={()=>{EditAction(order)}}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={()=>{deleteAction(order.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </div>
        :
        <div className="flex flex-col justify-center items-center my-10">
          <h1 className="text-3xl font-bold">No Order</h1>
          <p className="text-sm text-gray-500">Create a new order to get started</p>
        </div>
      }

      <CreateModal onCreate={getAllOrders} /> 
      <EditModal order={editOrder} onEdit={getAllOrders} /> 
      <DeleteModal item={order} onDelete={getAllOrders} initial='order' />
    </section>
  )
}
