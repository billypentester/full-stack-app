'use client'

import { useState, useEffect } from "react"

const EditModal = ({ customer, onEdit }) => {

    const [Updatecustomer, setUpdateCustomer] = useState({ id: '', name: '', email: '', age: '' })

    const updateCustomer = async (e) => {
        e.preventDefault()
        console.log(Updatecustomer)
        const response = await fetch(`http://localhost:5000/user/${Updatecustomer.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Updatecustomer)
        })
        console.log(response)
        if (response.status === 200) {
            document.getElementById('edit').close()
            setUpdateCustomer({ id: '', name: '', email: '', age: '' })
            onEdit()
        }
    }

    const editCustomer = (e) => {
        e.preventDefault()
        document.getElementById('edit').close()
    }

    useEffect(() => {
        setUpdateCustomer(customer)
    }, [customer])

    return (
        <dialog id="edit" className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Customer Details</p>
                <form className="form-control mt-3">
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">ID</span>
                        </label>
                        <input type="text" placeholder="ID" className="input input-bordered" name="name" disabled value={Updatecustomer.id} onChange={(e)=>setUpdateCustomer({...Updatecustomer, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="input input-bordered" name="name" value={Updatecustomer.name} onChange={(e)=>setUpdateCustomer({...Updatecustomer, name: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered" name="email" value={Updatecustomer.email} onChange={(e)=>setUpdateCustomer({...Updatecustomer, email: e.target.value})} />
                    </div>
                    <div className="mb-3 form-control">
                        <label className="label">
                            <span className="label-text">Age</span>
                        </label>
                        <input type="number" placeholder="Age" className="input input-bordered" name="age" value={Updatecustomer.age} onChange={(e)=>setUpdateCustomer({...Updatecustomer, age: e.target.value})} />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-warning" onClick={updateCustomer}>Update</button>
                        <button className="btn" onClick={editCustomer}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    )

}

export default EditModal
