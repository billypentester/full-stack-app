'use client'

import { useEffect, useState } from "react"

const EditOrderModal = ({ order, onEdit }) => {

    const [UpdateOrder, setUpdateOrder] = useState({ status: '', userId: '', productId: '' })

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])


    const updateOrder = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/order/${order.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UpdateOrder)
        })
        if (response.status === 200) {
            document.getElementById('edit').close()
            setUpdateOrder({ status: '', userId: '', productId: '' })
            onEdit()
        }
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
        setUpdateOrder((prevOrder)=> ({
            ...prevOrder, status: e.target.value
        }))
    }

    useEffect(() => {
        setUpdateOrder((prevOrder)=> ({
            ...prevOrder, id: order.id
        }))
    }, [order])

    const handleUser = (e) => {
        setUpdateOrder((prevOrder)=> ({
            ...prevOrder, userId: e.target.value
        }))
    }

    const handleProduct = (e) => {
        setUpdateOrder((prevOrder)=> ({
            ...prevOrder, productId: e.target.value
        }))
    }

    useEffect(() => {
        getAllProducts()
        getAllUsers()
    }, [])

    return (
        <dialog id="edit" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Order Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">ID</span>
                        </label>
                        <input type="text" placeholder="Id" className="input input-bordered" value={order.id} disabled />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">User</span>
                        </label>
                        <select className="select select-bordered w-full" name="userId" value={UpdateOrder.userId} onChange={handleUser}>
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
                        <select className="select select-bordered w-full" name="productId" value={UpdateOrder.productId} onChange={handleProduct}>
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
                        <select className="select select-bordered w-full" name="status" value={UpdateOrder.status} onChange={handleStatus}>
                            <option>Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={updateOrder}>Update</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default EditOrderModal 
