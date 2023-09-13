import HomeCard from "@/components/HomeCard"
import Link from "next/link"

export default function Home() {

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
            <HomeCard title={item.title} desc={item.desc} link={item.link} />
          )
        })
      }
    </div>
  )
}
