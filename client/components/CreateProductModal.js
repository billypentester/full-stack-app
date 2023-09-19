'use client'

import { useState } from "react"

const CreateProductModal = ({ onCreate }) => {

    const [product, setProduct] = useState({ name: '', email: '', age: '' })

    const createProduct = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/product/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
        console.log(response)
        if (response.status === 201) {
            document.getElementById('create').close()
            setProduct({ name: '', price: '' })
            onCreate()
        }
    }

    return (
        <dialog id="create" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Product Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" name="name" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered" name="price" value={product.price} onChange={(e)=>setProduct({...product, price: e.target.value})} />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={createProduct}>Create</button>
                        <button className="btn" onClick={(e)=>{e.preventDefault();document.getElementById('create').close()}}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default CreateProductModal 
