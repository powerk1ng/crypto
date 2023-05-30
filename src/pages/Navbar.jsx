import { Link } from 'react-router-dom'
import {FaBitcoin} from 'react-icons/fa'

const Navbar = () => {
  return (
    
    <header className='py-3'>
        <Link to={'/'} className='flex items-center justify-center gap-x-2'>
            <FaBitcoin size={40} fill="#6900ff"/>
            <span className='text-[30px] text-white'>Crypto<span className='text-[#6900ff]'>Search</span></span>
        </Link>
    </header>
  )
}

export default Navbar