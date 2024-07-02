import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Carousel from '../components/Carousel'


export default function Home() {

  const [search,setSearch] = useState('')
  const [foodCat, setFoodcat] = useState([])
  const [foodItem, setFooditem] = useState([])

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      // Update state based on data received
      if (data && data.length === 2) {
        setFooditem(data[0]);
        setFoodcat(data[1]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state if needed
    }
  };


  useEffect(() => {
    loadData()
  }, [])


  return (
    <>
      <div><Navbar /></div>
      {/* <div><Carousel /></div> */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="burger.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="biryani.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="momo.jpeg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {foodCat && foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem && foodItem.length !== 0 ? foodItem.filter((item) =>
                  item.CategoryName == data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                ).map(filteritems => {
                  return (
                    <div key={filteritems._id} className='col-12 col-md-6 col-lg-4'>
                      <Card 
                      foodItem = {filteritems}
                      // foodName={filteritems.name}
                        options={filteritems.options[0]}
                        // imgsrc={filteritems.img}
                      ></Card>
                    </div>
                  )
                })
                  : <div>No such data</div>}
              </div>
            )
          })
        ) : ""}
      </div>
      <div><Footer /></div>
    </>
  )
}
