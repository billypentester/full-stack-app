'use client'

import { useEffect, useState } from "react"

const CreateOrderModal = ({ onCreate }) => {

    const [order, setOrder] = useState({ status: '', userId: '', productId: '' })

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])


    const createOrder = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/order/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
        console.log(response)
        if (response.status === 201) {
            document.getElementById('create').close()
            setOrder({ status: '', userId: '', productId: '' })
            onCreate()
        }
    }

    const cancelOrder = (e) => {
        e.preventDefault()
        document.getElementById('create').close()
    }

    const getAllProducts = async() => {
        const response = await fetch('http://localhost:5000/product/')
        const data = await response.json()
        setProducts(data)
    }

    const getAllUsers = async() => {
        const response = await fetch('http://localhost:5000/user/')
        const data = await response.json()
        setUsers(data)
    }

    const handleStatus = (e) => {
        setOrder((prevOrder)=> ({
            ...prevOrder, status: e.target.value
        }))
    }

    const handleUser = (e) => {
        setOrder((prevOrder)=> ({
            ...prevOrder, userId: e.target.value
        }))
    }

    const handleProduct = (e) => {
        setOrder((prevOrder)=> ({
            ...prevOrder, productId: e.target.value
        }))
    }

    useEffect(() => {
        getAllProducts()
        getAllUsers()
    }, [])

    return (
        <dialog id="create" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Order Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">User</span>
                        </label>
                        <select className="select select-bordered w-full" name="userId" value={order.userId} onChange={handleUser}>
                            <option>Select User</option>
                            {users.map((user) => (
                                <option value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Product</span>
                        </label>
                        <select className="select select-bordered w-full" name="productId" value={order.productId} onChange={handleProduct}>
                            <option>Select product</option>
                            {products.map((product) => (
                                <option value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select className="select select-bordered w-full" name="status" value={order.status} onChange={handleStatus}>
                            <option>Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={createOrder}>Create</button>
                        <button className="btn btn-error" onClick={cancelOrder}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default CreateOrderModal 
