'use client'

import { useState, useEffect } from "react";

import DeleteModal from "@/components/DeleteModal";
import CreateModal from "@/components/CreateProductModal";
import EditModal from "@/components/EditProductModal";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [editProduct, setEditProduct] = useState('');
  const [search, setSearch] = useState('');

  const getAllProducts = async () => {
    const response = await fetch('http://localhost:5000/product/');
    const data = await response.json();
    setProducts(data);
  }

  const deleteAction = async (id) => {
    document.getElementById('delete-product').showModal();
    setProduct(id);
  }

  const EditAction = async (customer) => {
    document.getElementById('edit').showModal();
    setEditProduct(customer);
  }

  const onDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  }


  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="px-16">
      <div className="flex flex-col justify-between items-center my-10">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">Total Products: {products.length}</p>
      </div>
      <div className="flex flex-1 justify-between">
        <input type="text" placeholder="Search for product..." className="input input-bordered input-success w-full max-w-xs" onChange={(e)=>{setSearch(e.target.value)}}/>
        <button className="btn btn-success" onClick={()=>document.getElementById('create').showModal()}>Add New Product</button>
      </div>
      <div className="divider my-5"></div>
      <div className="overflow-x-auto my-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td className="flex gap-5">
                    <button className="btn btn-sm btn-warning" onClick={()=>{EditAction(product)}}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={()=>{deleteAction(product.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <CreateModal onCreate={getAllProducts} /> 
      <EditModal product={editProduct} onEdit={getAllProducts} />
      <DeleteModal item={product} onDelete={getAllProducts} initial='product' />
    </section>
  )
}
