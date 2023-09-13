'use client'

import { useState, useEffect } from "react"

const EditProductModal = ({ product, onEdit }) => {

    const [UpdateProduct, setUpdateProduct] = useState({ id: '', name: '', price: '' })

    const updateProduct = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/product/${UpdateProduct.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UpdateProduct)
        })
        console.log(response)
        if (response.status === 200) {
            document.getElementById('edit').close()
            setUpdateProduct({ id: '', name: '', price:'' })
            onEdit()
        }
    }

    useEffect(() => {
        setUpdateProduct(product)
    }, [product])

    return (
        <dialog id="edit" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Product Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">ID</span>
                        </label>
                        <input type="text" placeholder="ID" className="input input-bordered" name="name" disabled value={UpdateProduct.id} onChange={(e)=>setUpdateProduct({...UpdateProduct, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" name="name" value={UpdateProduct.name} onChange={(e)=>setUpdateProduct({...UpdateProduct, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="price" className="input input-bordered" name="price" value={UpdateProduct.price} onChange={(e)=>setUpdateProduct({...UpdateProduct, price: e.target.value})} />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-warning" onClick={updateProduct}>Update</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default EditProductModal
