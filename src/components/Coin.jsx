import CoinItem from "./CoinItem";
import { useNavigate } from "react-router-dom";



const Coin = ({ data }) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/coin/${id}`);
    };

    return (
        <div className="mx-auto max-w-[1140px] px-5 py-4 ">
            <table className="w-full text-white border-collapse">
                <thead>
                    <tr className="text-left">
                        <th className="py-2">#</th>
                        <th className="py-2">Coin</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">24h</th>
                        <th className="py-2 max-sm:hidden">Volume</th>
                        <th className="py-2 max-sm:hidden">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin) => {
                        return (
                            <tr key={coin.id}
                                className="hover:scale-[1.01] duration-300 cursor-pointer  hover:text-emerald-300"
                                onClick={() => handleClick(coin.id)}>
                                <CoinItem {...coin} />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Coin;
