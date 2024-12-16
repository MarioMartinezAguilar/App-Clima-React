import { useState } from "react"


export const WeatherApp = () => {
   const url = 'https://api.openweathermap.org/data/2.5/weather'
   const API_KEY = '8bb581fa26f3d40971f0875e469d8519' 
   const difKelvin = 273.15



    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }

    const hadleSubmit = (e) =>{
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () =>{
        try{
            const response = await fetch(`${url}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.log('Ocurrio un error', error)

        }
    }



  return (
    <div className="container">

        <h1>Aplicación Del Clima</h1>
        <form onSubmit={hadleSubmit}>
            <input 
            type="text"
            placeholder="Ingresa El Nombre De Una Ciudad"
            value={ciudad}
            onChange = {handleCambioCiudad} 
            />
            <button type="submit">Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="" />
                </div>
            )
        }
    </div>
    
  )
}
