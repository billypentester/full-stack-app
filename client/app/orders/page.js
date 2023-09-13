import Link from "next/link"

export default function Orders() {

  const navigator = [
    {
      title: "Customers",
      desc: "Click the button to check the customers CRUD",
      link: "/customers"
    },
    {
      title: "Products",
      desc: "Click the button to check the products CRUD",
      link: "/products"
    },
    {
      title: "Orders",
      desc: "Click the button to check the orders CRUD",
      link: "/orders"
    }
  ]

  return (
    <div className="flex flex-1 justify-center items-center gap-5">
      {
        navigator.map((item)=>{
          return(
            <div className="card w-1/4 bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.desc}</p>
                <div className="card-actions justify-end">
                  <Link href={item.link} className="btn">Visit</Link>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
