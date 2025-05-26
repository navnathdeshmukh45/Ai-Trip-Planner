import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Hotels = ({ trip }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (hotelIndex) => {
    setImageErrors(prev => ({
      ...prev,
      [hotelIndex]: true
    }));
  };

  console.log('Trip data in Hotels component:', trip);
  console.log('Hotels data:', trip?.TripData?.Hotels);

  if (!trip?.TripData?.Hotels) {
    return (
      <div className="max-w-2xl mx-auto pl-0 pr-1">
        <h2 className='font-bold text-xl mb-2'>Hotels Recommendation</h2>
        <p className='text-gray-500'>No hotel recommendations available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pl-0 pr-1">
      <h2 className='font-bold text-xl mb-2'>Hotels Recommendation</h2>

      <div className='grid grid-cols-1 gap-2'>
        {trip?.TripData?.Hotels?.map((hotel, index) => (
          <div key={index} className='block bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 w-full'>
            <div className='flex flex-col sm:flex-row'>
              {/* Image Section */}
              <div className='w-full sm:w-1/4 h-[160px] sm:h-auto'>
                <img
                  src={!imageErrors[index] && hotel?.imageUrl ? hotel.imageUrl : '/Hotel.jpeg'}
                  className='w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none'
                  onError={() => handleImageError(index)}
                  alt={hotel?.hotelName || 'Hotel image'}
                />
              </div>

              {/* Content Section */}
              <div className='w-full sm:w-3/4 p-2 flex flex-col justify-between'>
                <div className='space-y-1'>
                  {/* Hotel Name and Rating */}
                  <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-base line-clamp-1'>
                      {hotel?.hotelName}
                    </h2>
                    <div className='flex items-center gap-1'>
                      <span className='text-yellow-400 text-lg'>★</span>
                      <p className='font-medium text-gray-700 text-sm'>{hotel?.rating}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className='text-blue-600 font-semibold text-base'>
                    {hotel?.price}
                  </p>

                  {/* Address */}
                  <p className='text-xs text-gray-600 line-clamp-1'>
                    {hotel?.hotelAddress}
                  </p>

                  {/* Description */}
                  {hotel?.description && (
                    <p className='text-xs text-gray-500 line-clamp-2'>
                      {hotel.description}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className='flex gap-1 mt-2'>
                  <Link
                    to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
                    target="_blank"
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-1 px-2 rounded text-xs'
                  >
                    View on Map
                  </Link>
                  <Link
                    to={`https://www.booking.com/searchresults.html?ss=${hotel?.hotelName}`}
                    target="_blank"
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-1 px-2 rounded text-xs'
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels