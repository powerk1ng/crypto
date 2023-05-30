import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import axios from "axios";

const SingleCoinPage = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullDescription, setFullDescription] = useState(false);
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.id}`;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          setCoin(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, 1000);
  }, []);

  // Helper function to remove HTML tags from a string
  const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };

  const currentDate = new Date();
  const genesisDate = new Date(coin.genesis_date);

  const addZero = (val) => (val < 10 ? (val = "0" + val) : val);

  const getFormattedDate = (date) => {
    return `${addZero(date.getDate())}.${addZero(
      date.getMonth() + 1
    )}.${addZero(date.getFullYear())}`;
  };

  const formattedCurrentDate = getFormattedDate(currentDate);
  let formattedGenesisDate = getFormattedDate(genesisDate);

  return (
    <div className="bg-white mx-auto max-w-[1020px] px-5 py-4 text-white">
      {loading ? (
        // render a loading component
        <div className="z-50 absolute inset-0 min-h-screen bg-gradient-to-r from-slate-900 to-slate-900">
          <SyncLoader
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            color="white"
          />
        </div>
      ) : (
        // render the content
        <div>
          {/* top */}
          <div className="shadow-md shadow-black/30 p-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-900 text-[#6366f1] text-3xl text-center">
            <h1>{coin.name}</h1>
          </div>

          {/* coin info*/}
          <div className="mt-4 shadow-md shadow-black/30 p-3 rounded-lg bg-gradient-to-r from-slate-900 to-slate-900">
            {/* rank and genesis time */}
            <div className="flex justify-between">
              <span className="italic bg-indigo-500 p-2 rounded-md text-white">
                Rank #{coin.coingecko_rank}
              </span>
              <span>
                Genesis date:{" "}
                {formattedGenesisDate !== "01.01.1970"
                  ? formattedGenesisDate
                  : "Unknown"}
              </span>
            </div>``

            {/*value and date  */}
            <div className="flex justify-between items-center mt-4 max-sm:text-sm">
              <div className="flex gap-x-3 items-center">
                <img src={coin.image?.thumb} alt={coin.name} />
                <span>{coin.name}</span>
                <span>({coin.symbol.toUpperCase()})</span>
              </div>
              <p className="text-2xl text-emerald-300 max-sm:text-[16px]">
                ${coin.market_data?.current_price?.usd.toLocaleString()}
              </p>
              <p>{formattedCurrentDate}</p>
            </div>
          </div>

          {/* price-change in table */}
          <table className="mt-4 shadow-md shadow-black/30 rounded-lg bg-gradient-to-r from-slate-900 to-slate-900 w-full">
            <thead>
              <tr className="bg-slate-300 text-black border-2 border-black">
                <th className="p-3 border-2 border-black">1h</th>
                <th className="p-3 border-2 border-black">24h</th>
                <th className="p-3 border-2 border-black">7d</th>
                <th className="p-3 border-2 border-black">14d</th>
                <th className="p-3 border-2 border-black">30d</th>
                <th className="p-3 border-2 border-black">1y</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center max-sm:text-sm">
                <td className="py-2 border-r-2 border-r-white/60">
                  {coin.market_data?.price_change_percentage_1h_in_currency.usd.toFixed(
                    2
                  )}
                  %
                </td>
                <td className="border-r-2 border-r-white/60">
                  {coin.market_data?.market_cap_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                </td>
                <td className="border-r-2 border-r-white/60">
                  {coin.market_data?.price_change_percentage_7d.toFixed(2)}%
                </td>
                <td className="border-r-2 border-r-white/60">
                  {coin.market_data?.price_change_percentage_14d.toFixed(2)}%
                </td>
                <td className="border-r-2 border-r-white/60">
                  {coin.market_data?.price_change_percentage_30d.toFixed(2)}%
                </td>
                <td className="border-r-2 border-r-white/60">
                  {coin.market_data?.price_change_percentage_1y.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>

          {/* additional details */}
          <div className="mt-4 shadow-md p-4 rounded-lg bg-gradient-to-r from-slate-900 to-slate-900">
            <div className="flex justify-between w-full gap-x-10 max-sm:flex-col max-sm:gap-y-4">
              {/* 24h low */}
              <div className="flex justify-between basis-[50%] border-b-2 border-b-white">
                <p>24h Low</p>
                <p className="text-emerald-400">
                  ${coin.market_data.low_24h?.usd.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between basis-[50%] border-b-2 border-b-white">
                <p>Market Cap</p>
                <p className="text-emerald-400">
                  ${coin?.market_data?.market_cap?.usd.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="mt-4 shadow-md shadow-black/30 text-[14px] p-4 rounded-lg bg-gradient-to-r from-slate-900 to-slate-900">
            <article className="font-poppins">
              <h3 className="mb-4 text-3xl max-sm:text-xl">About</h3>
              {coin?.description?.en ? (
                coin.description.en.length > 500 ? (
                  <>
                    {removeHTMLTags(coin.description.en).slice(0, 500)}
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => setFullDescription(true)}
                    >
                      {!fullDescription && "...more"}
                    </button>
                  </>
                ) : (
                  removeHTMLTags(coin.description.en)
                )
              ) : (
                "No current description available"
              )}
              {fullDescription && coin?.description?.en.length > 500 && (
                <>
                  {removeHTMLTags(coin.description.en).slice(500)}
                  <br />
                  <button
                    className="ml-2 mt-2 border-2 p-2 bg-blue-500"
                    onClick={() => setFullDescription(false)}
                  >
                    Read Less
                  </button>
                </>
              )}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCoinPage;
