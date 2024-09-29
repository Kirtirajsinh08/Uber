import React, { useState , useContext, useEffect} from 'react'
import { source, destination, plotOnMap } from './context'
import axios from "axios"
import toast from 'react-hot-toast'

const CabOptions = ({distance}) => {
    distance = distance/1000
    const [active, setActive] = useState(0)
    const [selected, setSelected] = useState({})
    const [prices, setPrices] = useState([])
    const {plot} = useContext(plotOnMap)
    const sourceCoordinates = useContext(source)
    const destinationCoordinates = useContext(destination)
    const [showModal, setShowModal] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState({
        cardType: '',
        cardHolderName: '',
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: ''
    })
    const [errors, setErrors] = useState({})

    const getPrizes = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/getPrizes/');
            console.log(response.data); 
            setPrices(response.data) 
            console.log(prices, "Prices")// Log the response data
            // Handle the data
        } catch (error) {
            console.error('Failed to fetch:', error);  // Log the actual error
        }
    }
    useEffect(()=>{
        getPrizes()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPaymentDetails(prev => {
            const newDetails = { ...prev, [name]: value }
            // Reset month if year changes to ensure valid combination
            if (name === 'expiryYear') {
                newDetails.expiryMonth = ''
            }
            return newDetails
        })
    }

    const validateForm = () => {
        let formErrors = {}
        if (!paymentDetails.cardType) formErrors.cardType = "Card type is required"
        if (!paymentDetails.cardHolderName) formErrors.cardHolderName = "Card holder name is required"
        if (paymentDetails.cardNumber.length !== 12) formErrors.cardNumber = "Card number must be 12 digits"
        if (paymentDetails.cvv.length !== 3) formErrors.cvv = "CVV must be 3 digits"
        if (!paymentDetails.expiryMonth) formErrors.expiryMonth = "Expiry month is required"
        if (!paymentDetails.expiryYear) formErrors.expiryYear = "Expiry year is required"
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            toast.success("Cab Booked Successfully!")
            setShowModal(false)
        }
    }


    const renderModal = () => {
        if (!showModal) return null

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const years = Array.from({length: 7}, (_, i) => 2024 + i)

        const availableMonths = paymentDetails.expiryYear === '2024' 
            ? months.slice(10) // Only November and December for 2024
            : months

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-2">
                                <input 
                                    type="radio" 
                                    name="cardType" 
                                    value="debit" 
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Debit Card
                            </label>
                            <label className="block">
                                <input 
                                    type="radio" 
                                    name="cardType" 
                                    value="credit" 
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Credit Card
                            </label>
                            {errors.cardType && <p className="text-red-500 text-sm">{errors.cardType}</p>}
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                name="cardHolderName" 
                                placeholder="Card Holder Name"
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            {errors.cardHolderName && <p className="text-red-500 text-sm">{errors.cardHolderName}</p>}
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                name="cardNumber" 
                                placeholder="Card Number (12 digits)"
                                maxLength="12"
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                name="cvv" 
                                placeholder="CVV (3 digits)"
                                maxLength="3"
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                        </div>
                        <div className="mb-4 flex justify-between">
                            <select 
                                name="expiryMonth" 
                                onChange={handleInputChange}
                                value={paymentDetails.expiryMonth}
                                className="p-2 border rounded"
                            >
                                <option value="">Expiry Month</option>
                                {availableMonths.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                            <select 
                                name="expiryYear" 
                                onChange={handleInputChange}
                                value={paymentDetails.expiryYear}
                                className="p-2 border rounded"
                            >
                                <option value="">Expiry Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        {errors.expiryMonth && <p className="text-red-500 text-sm">{errors.expiryMonth}</p>}
                        {errors.expiryYear && <p className="text-red-500 text-sm">{errors.expiryYear}</p>}
                        <div className="flex justify-end">
                            <button 
                                type="button" 
                                onClick={() => setShowModal(false)}
                                className="mr-2 px-4 py-2 bg-gray-200 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-black text-white rounded"
                            >
                                Pay
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


  return (
    <>
    { distance != -1  && prices.length != 0 && plot?
    <div className='w-full py-4'>
        
        <div className='grid grid-cols-3 grid-rows-[8rem_8rem_auto] w-[24rem] h-full gap-y-4 gap-x-2'>
            <div className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${active == 1 ? 'border-black bg-gray-300' : ''}`} onClick = {()=> { setActive(1) ; setSelected({name : 'byke', destination: destinationCoordinates, source : sourceCoordinates, price : prices[0].price * distance})}}>
                <span className='flex text-md font-semibold justify-center items-center'>Byke</span>
                <img src='/images/Byke.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil(prices[0].price * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>2</span>
                </div>
            </div>
            
            <div className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${active == 2 ? 'border-black bg-gray-300' : ''}`} onClick = {()=> { setActive(2) ; setSelected({name : 'auto', destination: destinationCoordinates, source : sourceCoordinates, price : prices[1].price * distance})}}>
                <span className='flex text-md font-semibold justify-center items-center'>Auto</span>
                <img src='/images/Auto.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil(prices[1].price * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>3</span>
                </div>
            </div>

            <div className={`py-2 w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer' ${active == 3 ? 'border-black  bg-gray-300 ' : ''}`}onClick = {()=> { setActive(3) ; setSelected({name : 'economy', destination: destinationCoordinates, source : sourceCoordinates, price : prices[2].price * distance})}}>
                <span className='flex text-md font-semibold justify-center items-center'>Economy</span>
                <img src='/images/Ecomomy.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil(prices[2].price * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>4</span>
                </div>
            </div>

            <div className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${active == 4 ? 'border-black bg-gray-300' : ''}`} onClick = {()=> { setActive(4) ; setSelected({name : 'classic', destination: destinationCoordinates, source : sourceCoordinates, price : prices[3].price * distance})}}>
                <span className='flex text-md font-semibold justify-center items-center'>Classic</span>
                <img src='/images/Classic.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil(prices[3].price * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>4</span>
                </div>
            </div>

            <div className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${active == 5 ? 'border-black bg-gray-300' : ''}`} onClick = {()=> { setActive(5) ; setSelected({name : 'premium', destination: destinationCoordinates, source : sourceCoordinates, price : prices[4].price * distance})}}>
                <span className='flex text-md font-semibold justify-center items-center'>Premium</span>
                <img src='/images/Premium.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil(prices[4].price * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>4</span>
                </div>
            </div>

            <div className={`py-2 w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer' ${active == 6 ? 'border-black  bg-gray-300 ' : ''}`}onClick = {()=> { setActive(6) ; setSelected({name : 'extra large', destination: destinationCoordinates, source : sourceCoordinates, price : prices[5].price * distance })}}>
                <span className='flex text-md font-semibold justify-center items-center'>Extra Large</span>
                <img src='/images/Extra Large.png'  className='h-16 w-full object-cover flex justify-center items-center'/>
                <div className='flex justify-evenly items-center text-sm'>
                    <span className='font-bold '>{Math.ceil((prices[5].price) * distance)}₹</span>
                    <span className='flex items-center gap-1'><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>6</span>
                </div>
            </div>
            <button 
                    className={`${ (active === 0 ) ? "bg-[#000000A0]" : "bg-black"} w-[24rem] h-[2.75rem] text-lg text-white py-2 rounded-md ${ (active === 0 ) ?  "cursor-not-allowed" : ""}`} 
                    disabled={ (active === 0 ) } 
                    onClick={() => setShowModal(true)}
                >
                    Book Ride
            </button>

        </div>
    </div>
    : <></>}
    {renderModal()}
    </>
  )
}

export default CabOptions