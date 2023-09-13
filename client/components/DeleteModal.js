'use client'

const DeleteModal = ({item, onDelete, initial}) => {

    const deleteItem = async () => {
        const response = await fetch(`http://localhost:5000/${initial}/${item}`, { method: 'DELETE' })
        console.log(response)
        if (response.status === 200) {
            document.getElementById(`delete-${initial}`).close()
            onDelete()
        }
    }

    return (
        <dialog id={`delete-${initial}`} className="modal">
            <div className="modal-box">
                <p className="text-lg font-bold">Are you sure you want to delete this {initial}?</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={deleteItem}>Delete</button>
                    <button className="btn" onClick={()=>document.getElementById(`delete-${initial}`).close()}>Cancel</button>
                </div>
            </div>
        </dialog>
    )

}

export default DeleteModal
