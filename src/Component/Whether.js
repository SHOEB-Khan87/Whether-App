import React, { useState, useEffect } from 'react'

const getData = () => {
  let get = localStorage.getItem("test")
  if (get) {
    return JSON.parse(localStorage.getItem("test"))
  } else {
    return [];
  }
}

let Temp = () => {

  let [city, setCity] = useState(getData());
  let [search, setSearch] = useState("");
  let [error, setError] = useState()
  let [init, setInit] = useState();





  const AddItem = async () => {


    let url = `http://api.weatherapi.com/v1/current.json?key=32132823a5b044dba54103212231901&q=${search}`;
    let data = await fetch(url);
    let resJson = await data.json();


    if (resJson.error) {
      setInit(resJson.error.message);
      setError(resJson.error)

    }

    {

      if (resJson.location) {
        let filter = city.findIndex(elem => elem.cityName.name === resJson.location.name)

        const data = {
          id: new Date().getMilliseconds().toString(),
          name: resJson.current,
          cityName: resJson.location
        }




        if (filter >= 0) {

        } else if (city && city.length > 0) {
          setCity([...city, data])
          setSearch("")
        } else {

          setCity([...city, data])


        }
      }
    }

  }

  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(city))

  }, [city, error])

  const Remove = () => {
    setCity([])
  }

  const deleteItem = (id) => {
    let filteredItems = city.filter((elem) => {
      return id !== elem.id
    })
    setCity(filteredItems)
  }


  const close = () => {
    setError("")

  }
  return (
    <>

      <h1 style={{ textAlign: "center", color: "lightgray", marginBottom: "20px", marginTop: "20px" }}>Whether App</h1>
      <div className='container-fluid'>

        <div className='container d-fl ex justify-content-center'>
          <div className="input-group mb-3">

            <input type="text" value={search} onChange={(event) => { setSearch(event.target.value) }} className="form-control text-center  text-dark" placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2" disabled={search === ""} onClick={AddItem}>Add</button>
          </div>
        </div>
        <div className='container d-flex justify-content-center'><button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={Remove}>Remove All</button></div>


        {error ? <div className="alert alert-warning alert-dismissible fade show my-3 " role="alert" style={{textAlign:"center"}}>
          <strong >{error.message}</strong>
          <button type="button" onClick={close} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> : ""}



        <>


          <div className='container'>
            <div className='row g-2 justify-content-center'>

              {city && city.map((elem) => {
                return <div key={elem.id} className='col-sm-6 '>
                  <div className='d-flex my-3 g-1 justify-content-center'>
                    <div className="card  text-dark" style={{ height: "250px", width: "300px" }}>


                      <div className="card-img-overlay" >
                        <button className=" btn btn-outline-secondary" style={{ float: "right" }} type="button" id="button-addon2" onClick={() => { deleteItem(elem.id) }}>delete</button>
                        <h1 className="card-title">{elem.cityName && elem.cityName.name}</h1>
                        <p >{new Date().toLocaleTimeString()} </p>
                        <p className="card-text  text-end" style={{ float: "right", fontSize: "15px" }} >L: {elem.cityName && elem.cityName.lat}°</p>
                        <p className="card-text  ">{elem.name && elem.name.temp_c}°Cel</p>
                        <p className="card-text  text-end" style={{ float: "right", fontSize: "15px" }}> H:{elem.name && elem.name.humidity}° </p>
                        <img src={elem.name && elem.name.condition.icon} alt={elem.name && elem.name.condition.text} />

                      </div>
                    </div>
                  </div>

                </div>


              })}
            </div>
          </div>

        </>



      </div>






    </>
  )
}


export default Temp;