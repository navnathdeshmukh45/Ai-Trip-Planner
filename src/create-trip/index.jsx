import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/option';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { chatSession } from '@/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';


function Createtrip() {
  const [places, setPlaces] = useState([])

  const [formData, setFormData] = useState({});
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [openDailog, setOpenDailog] = useState(false);

  const handleInputChange=(name,value)=>{
    console.log('Destination input:', name, value);
    setFormData({
      ...formData,
      [name]:value
    })
  }
  
  useEffect(()=>{
    console.log(formData)
  },[formData])
  
  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      try {
        await GetUserProfile(codeResp);
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    }
  });


  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      toast.success("Successfully logged in!");
      OnGenerateTrip();
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  };


const SaveAiTrip=async(TripData)=>{
  setLoading(true)
  const user = JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString();
  console.log('Saving trip data:', { userSelection: formData });
  
  try {
    // Parse the AI response as JSON
    const parsedTripData = JSON.parse(TripData);
    console.log('Parsed trip data:', parsedTripData);
    
    await setDoc(doc(db, "AITrips", docId),{
      userSelection: formData,
      TripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
    });
    
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  } catch (error) {
    console.error('Error parsing or saving trip data:', error);
    toast.error("Error saving trip data. Please try again.");
    setLoading(false);
  }
}

  const OnGenerateTrip=async()=>{

   const user = localStorage.getItem('user');

   if(!user){
    setOpenDailog(true)
    return;
   }


    if(!formData?.destination || !formData?.days || !formData?.budget || !formData?.travelers) {
      toast.error("Please fill all the fields");
      return;
    }
    // if(!formData?.days) {
    //   toast.error("Please enter number of days");
    //   return;
    // }
    // if(formData?.days > 5) {
    //   toast.error("Trip duration cannot exceed 5 days");
    //   return;
    // }
    // if(!formData?.budget) {
    //   toast.error("Please select a budget option");
    //   return;
    // }
    // if(!formData?.travelers) {
    //   toast.error("Please select number of travelers");
    //   return;
    // }
    
    // console.log(formData)
    setLoading(true)

    const FINALPROMPT= AI_PROMPT.replace('{destination}',formData?.destination)
    .replace('{days}',formData?.days)
    .replace('{budget}',formData?.budget)
    .replace('{travelers}',formData?.travelers)

    // console.log(FINALPROMPT)

   const result= await chatSession.sendMessage(FINALPROMPT)

    console.log(result.response.text());
    setLoading(false)
    SaveAiTrip(result.response.text());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Leverage AI-Driven Personalization for Seamless Travel Planning
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to generate tailored itineraries that align with your unique preferences and budget, ensuring an optimized and enriching travel experience
          </p>
        </div>

        <div className="space-y-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>What is your destination?</h2>
            <input 
              placeholder={'Ex. Paris'} 
              type={'text'} 
              onChange={(e)=>handleInputChange('destination',e.target.value)} 
              className=" bg-white w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            {/* <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              selectProps={{
                onChange: (v) => {setPlaces(v); handleInputChange('destination',v)},
                debounce: 500,
                className: "w-full",
                placeholder: "Search for a destination..."
              }}
            /> */}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>How many days are you planning your trip?</h2>
            <input 
              placeholder={'Ex. 3'} 
              type={'number'} 
              onChange={(e)=>handleInputChange('days',e.target.value)} 
              className=" bg-white w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Tell us about your budget?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {SelectBudgetOptions.map((item,index)=>(
                <div key={index} 
                  onClick={()=>handleInputChange('budget',item.title)}
                  className={`p-6 border-2 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1
                    ${formData?.budget === item.title 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300'}`}>
                  <h2 className='text-5xl mb-4 transform hover:scale-110 transition-transform duration-300'>{item.icon}</h2>
                  <h2 className='font-bold text-xl text-gray-800'>{item.title}</h2>
                  <h2 className='text-gray-600 mt-2'>{item.desc}</h2>      
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Who do you plan on traveling with?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {SelectTravelesList.map((item,index)=>(
                <div key={index}
                  onClick={()=>handleInputChange('travelers',item.people)}
                  className={`p-6 border-2 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1
                    ${formData?.travelers === item.people 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300'}`}>
                  <h2 className='text-5xl mb-4 transform hover:scale-110 transition-transform duration-300'>{item.icon}</h2>
                  <h2 className='font-bold text-xl text-gray-800'>{item.title}</h2>
                  <h2 className='text-gray-600 mt-2'>{item.desc}</h2>      
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 flex justify-end'>
          <Button 
            disabled={loading}
            onClick={OnGenerateTrip}
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            
            {loading ? <AiOutlineLoading3Quarters className=' h-7 w-7 animate-spin' /> : "Generate Trip"}
          </Button>


        </div>
        <Dialog open={openDailog} onOpenChange={setOpenDailog}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign in to continue</DialogTitle>
              <div className="text-sm text-gray-500">
                Please sign in to access all features
              </div>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Button  
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => login()}
              >
               
                <FcGoogle className="h-5 w-5" />
                Sign in with Google            
              </Button>
            </div>
          </DialogContent>
        </Dialog>



      </div>
    </div>
  )
}
export default Createtrip