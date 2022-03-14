import React from 'react'
import { useLocation,useParams } from 'react-router-dom'

export const Details = () => {
    const location = useLocation()
    let  {id}  = useParams();
    console.log('dssss',id);


    const { state } = location
    console.log('data', state);
    return (
        <div>
            {JSON.stringify(state.filter(s => s.objectID == id))}
        </div>
    )
}
