import React from 'react'

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>PlacesToVisit</h2>
      <div>
        {trip?.TripData?.itinerary?.map((item, index) => (
          <div key={`day-${index}`}>
            <h2 className='font-bold text-lg mb-4'>{item.Day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.plan.map((place, placeIndex) => (
                <div key={`place-${placeIndex}`} className="mb-4 p-4 border rounded-lg shadow-sm">
                  <img 
                    src="/src/assets/images (2).jpeg"
                    alt={place.placeName}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h2 className='font-bold'>{place.placeName}</h2>
                  <p className='text-sm'>{place.placeDetails}</p>
                  <p className='text-sm '>Best time to visit: {place.bestTimeToVisit}</p>
                  <p className='text-sm'>Ticket Price: {place.ticketPrice}</p>
                  <p className='text-sm'>Rating: {place.rating}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit