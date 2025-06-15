import React, { useState } from 'react'

function PlacesToVisit({ trip }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (placeIndex) => {
    setImageErrors(prev => ({
      ...prev,
      [placeIndex]: true
    }));
  };

  return (
    <div className="max-w-2xl mx-auto pl-0 pr-1">
      <h2 className='font-bold text-xl mb-2'>Places To Visit</h2>
      <div>
        {trip?.TripData?.itinerary?.map((item, index) => (
          <div key={`day-${index}`} className="mb-8">
            <h2 className='font-bold text-lg mb-4'>{item.Day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.plan.map((place, placeIndex) => (
                <div key={`place-${placeIndex}`} className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300">
                  {/* Image Section */}
                  <div className="h-[200px] relative">
                    <img 
                      src={!imageErrors[placeIndex] && place?.imageUrl ? place.imageUrl : '/placeholder.jpeg'}
                      className='w-full h-full object-cover rounded-t-lg'
                      onError={() => handleImageError(placeIndex)}
                      alt={place.placeName || 'Place image'}
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4">
                    <h2 className='font-semibold text-lg mb-2'>{place.placeName}</h2>
                    <p className='text-sm text-gray-600 mb-2 line-clamp-2'>{place.placeDetails}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Best time to visit: {place.bestTimeToVisit}</p>
                      <p>Ticket Price: {place.ticketPrice}</p>
                      <p>Rating: {place.rating}</p>
                    </div>
                  </div>
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