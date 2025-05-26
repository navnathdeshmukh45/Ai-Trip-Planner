export const SelectTravelesList= [
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏕️',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🍻',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions= [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon:'💸'
    },
]

export const AI_PROMPT = `Generate Travel Plan for Location: {destination}, for {Days} Days for {traveler} with a {budget} budget. 

Please provide the response in the following JSON format:
{
  "Hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "imageUrl": "string (use a valid, publicly accessible image URL)",
      "rating": "string",
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "Day": "string",
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "imageUrl": "string (use a valid, publicly accessible image URL)",
          "coordinates": "string",
          "ticketPrice": "string",
          "rating": "string",
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}

Important notes:
1. Make sure to include at least 3 hotel options with complete details
2. For imageUrl fields, use valid, publicly accessible image URLs
3. If you cannot find valid image URLs, leave the imageUrl field empty and the system will use a default image
4. All URLs should be HTTPS and publicly accessible`