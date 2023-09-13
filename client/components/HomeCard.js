import React from 'react'
import Link from 'next/link'

const HomeCard = ({title, desc, link}) => {
  return (
    <div className="card w-1/4 bg-success text-success-content shadow-xl">
        <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
            <Link href={link} className="btn">Visit</Link>
        </div>
        </div>
    </div>
  )
}

export default HomeCard
