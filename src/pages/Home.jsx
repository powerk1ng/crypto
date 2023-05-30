import React from 'react'
import Coin from '../components/Coin'

const Home = ({ data }) => {
    
    return (
        <main>
            <Coin data={data} />
        </main>
    )
}

export default Home