import React, {useState, useEffect, useRef} from 'react'
import { getAllStarships } from '../../services/sw-api'

const ShipCards = () => {
    let [shipInfo, setShipInfo] = useState([]);
    let [nextPage, setNextPage] = useState(null)
    let isFirstRender = useRef(true);

    const apiRequest = async (nPage) => {
        let shipRequest = await getAllStarships(nPage)
        console.log(shipRequest.data)
        await setNextPage(shipRequest.data.next)
        let shipJSX = shipRequest.data.results.map(item => {
            return <div key={item.url} className="ShipCard" ><p>Name: {item.name}</p>Model: {item.model}<p></p></div>
        })
        setShipInfo([...shipInfo, shipJSX])
        console.log(shipInfo)
    } 

    const loadMoreHandler = async (nPage) => {
        apiRequest(nPage)
    }
    

    const effectAsyncWorkAround = async () => {
        if(isFirstRender.current === true){
            isFirstRender.current = false;
            apiRequest()
        }}
    useEffect(() => {
        effectAsyncWorkAround()
    }, [])
    


  return (
    <div className='cardHold'>

         {shipInfo} 

         <h3 onClick={() => loadMoreHandler(nextPage)}>Load More</h3>

    </div>
  )
}

export default ShipCards