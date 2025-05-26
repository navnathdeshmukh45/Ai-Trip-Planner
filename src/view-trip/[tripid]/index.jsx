import { db } from '@/service/firebaseConfig'
import React, { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Toast } from '@radix-ui/react-toast'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'

const viewtrip = () => {
    const { tripid } = useParams()
    const [trip, setTrip] = useState([]);
    useEffect(() => {
        tripid && GetTripData()
    }, [tripid])

    const GetTripData = async () => {
        const docref = doc(db, "AITrips", tripid)
        const docSnap = await getDoc(docref);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Fetched trip data:", data);
            console.log("Destination:", data.userSelection?.destination);
            setTrip(data)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    return (
    <div className='p-10  md:px-20  lg:px-44 xl:px-56'>
        {/* Information Section */}
          <InfoSection trip={trip}/>

     <div className='p-10  md:px-20  lg:px-44 xl:px-56'>
        {/* Recommended Hotel */}
        <Hotels trip={trip}/>
        
    </div>

    <div className='p-10  md:px-20  lg:px-44 xl:px-56'>
        {/*  Daily Plan*/}
     <PlacesToVisit trip={trip} />
     </div>
    
        {/* Footer */}
    </div>
  )
}

export default viewtrip