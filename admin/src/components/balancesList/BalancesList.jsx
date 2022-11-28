import './balancesList.scss';
import axios from 'axios';
import bookingJSON from "../../Booking.json"
import { ethers } from "ethers";
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import Web3Modal from "web3modal";
import WithdrawalItems from './withdrawalItems/WithdrawalItems';


const providerOptions = {

    /*

    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "8231230ce0b44ec29c8682c1e47319f9" // required
      }
    },

    coinbasewallet: {
      package: CoinbaseWalletSDK, // required
      options: {
        infuraId: "8231230ce0b44ec29c8682c1e47319f9" // required
      }
    }

    */
    
};



    

const BalancesList = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    const usdcAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';

    const [web3Provider, setWeb3Provider] = useState(null)

    const [selectBook, setSelectBook] = useState({})
    const [withdrawals, setWithdrawals] = useState([])

    const { data, loading } = useFetch(`https://api.tickether.io/api/bookees/books/${user.bookee[0]}`)

    //const navigate = useNavigate()

    const bookBalance = (
        'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + usdcAddress + '&address=' + selectBook.contractAddress + '&tag=latest&apikey=' + process.env.ETHERSCAN_API_TOKEN + '/'
    )

    const connectAccount = async () => { 
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: false, // optional
                providerOptions // required
            });
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            console.log(provider)

            const signer = provider.getSigner();
            console.log(signer)

            if(provider) {
                setWeb3Provider(provider)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    /*
    const handleChange = (e) => {
        setInfo(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    */

    const handleSelect = async (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value)
        const book = await axios.get(`https://api.tickether.io/api/books/${value}`)
        const _withdrawals = await axios.get(`https://api.tickether.io/api/books/withdrawals/${value}`)
        setSelectBook(book.data)
        setWithdrawals(_withdrawals.data)
        
    }

    console.log(selectBook)

    

    const handleClick = async () => {
        if (web3Provider) {
            const signer = web3Provider.getSigner();
            const bookingContract = new ethers.Contract(
                selectBook.contractAddress,
                bookingJSON.abi,
                signer
            );
            try{
                
                // attempt udsc  withdraw
                const response = await bookingContract.withdrawERC20();
                console.log(response)

                //After metamask corfirmation of mint and store txid
                const transactionHash = response['hash']
                const txReceipt = []
                do {
                let txr = await web3Provider.getTransactionReceipt(transactionHash)
                txReceipt[0]=txr
                console.log('confirming...')
                } while (txReceipt[0] == null) ;
                
                console.log(txReceipt[0])

                //DB Data
                const newWithdrawal = {
                    txnId: transactionHash,
                    book: selectBook._id,
                    bookee: user.bookee[0],
                }

                //Post to DB after confirmation 
                axios.post(`https://api.tickether.io/api/withdrawals/${selectBook._id}/${user.bookee[0]}`, newWithdrawal) // Bookings information from form
            
                //navigate(`/success/${bookeeId}`)
            } catch(err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="balancesList">
            <div className="selectBooks">
                <label htmlFor="">Select Book:</label>
                <select defaultValue={'DEFAULT'} id="books" onChange={handleSelect}>
                    <option value="DEFAULT" disabled >Please Choose ...</option>
                    {loading ? "loading" : data && data.map(item=>(
                        <option key={item._id} value={item._id}>{item.bookName}</option>
                    ))}
                </select>
                <div className='withdrawInfo'>
                    <div className="listResults">
                        {loading ? (
                            "loading"
                        )   :   (
                            <>
                                {withdrawals.map(item=>(
                                    <WithdrawalItems item={item} key={item._id}/>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div> 
            {web3Provider == null ? (
                    <div>
                        <p className='paragraphs'>Please connect your wallet to complete booking</p>
                        <button onClick={connectAccount}>connect to withdraw...</button>
                    </div>
                
                )   :   (
                    <button 
                        onClick={handleClick}  
                        className=""
                    >
                        Withdraw!
                    </button>
            
                )}
        </div>
    );
}
  
export default BalancesList;
  








