'use client'

import { useState } from "react"

const CreateUserModal = ({ onCreate }) => {

    const [customer, setCustomer] = useState({ name: '', email: '', age: '' })

    const createCustomer = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
        console.log(response)
        if (response.status === 201) {
            document.getElementById('create').close()
            setCustomer({ name: '', email: '', age: '' })
            onCreate()
        }
    }

    const dismissModal = (e) => {
        e.preventDefault()
        document.getElementById('create').close()
        setCustomer({ name: '', email: '', age: '' })
    }

    return (
        <dialog id="create" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Customer Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" name="name" value={customer.name} onChange={(e)=>setCustomer({...customer, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered" name="email" value={customer.email} onChange={(e)=>setCustomer({...customer, email: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Age</span>
                        </label>
                        <input type="number" placeholder="Age" className="input input-bordered" name="age" value={customer.age} onChange={(e)=>setCustomer({...customer, age: e.target.value})} />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={createCustomer}>Create</button>
                        <button className="btn" onClick={dismissModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default CreateUserModal
