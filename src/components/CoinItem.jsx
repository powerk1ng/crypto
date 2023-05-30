import React from 'react'

const CoinItem = (coin) => {
  return (
    <>
      <td className='py-2'>{coin.market_cap_rank}</td>
      <td className='flex gap-x-3 items-center py-2'>
        <img className='w-5 h-5 rounded-full border-0' src={coin.image} alt={coin.name} />
        {coin.symbol.toUpperCase()}
      </td>
      <td className='py-2 before:border-none after:border-none'>${coin.current_price.toLocaleString()}</td>
      <td className={`py-2 ${coin.price_change_percentage_24h.toString().startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td className='max-sm:hidden py-2 border-0'>${coin.total_volume.toLocaleString()}</td>
      <td className='max-sm:hidden py-2 border-0'>${coin.market_cap.toLocaleString()}</td>
    </>
  )
}

export default CoinItem