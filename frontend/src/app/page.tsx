"use client";
import "@/styles/home.scss";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import Card from "@/components/card";
import BitcoinImage from "@/assets/bitcoin.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import LineGraph from "@/components/line-graph";
import { BITCOIN_PRICE_URL, POPULATION_URL } from "@/lib/constanst";

async function fetchData(url: string): Promise<any> {
  return (await fetch(url)).json();
}

export interface IPopulationData {
  "ID Nation": string;
  Nation: string;
  "ID Year": number;
  Year: string;
  Population: number;
  "Slug Nation": string;
}

interface ICurrency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

type CurrencyData = Record<string, ICurrency>;

export default function Home() {
  const [populationData, setPopulationData] = useState<IPopulationData[]>([]);
  const [bitcoinPriceData, setBitcoinPriceData] = useState<CurrencyData>({});
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    (async () => {
      const population_data = await fetchData(POPULATION_URL);
      setPopulationData(
        population_data["data"].toSorted(
          (a: IPopulationData, b: IPopulationData) =>
            a["ID Year"] - b["ID Year"]
        )
      );
      const bitcoin_price_data = await fetchData(BITCOIN_PRICE_URL);
      setBitcoinPriceData(bitcoin_price_data["bpi"]);
    })();
  }, []);

  return (
    <>
      <main className="main__container">
        <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
        <div className={`main__body ${openSidebar ? "open" : "close"}`}>
          <div className="main__header">
            <div
              className="main__header-icon"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <GiHamburgerMenu />
            </div>
            <div className="main__header-text">Welcome User</div>
          </div>
          <LineGraph populationData={populationData} />
          <div className="price-card__container">
            {Object.keys(bitcoinPriceData).map((currency, key) => (
              <Card
                key={key}
                cryptoName="Bitcoin"
                currency={currency}
                price={bitcoinPriceData[currency].rate}
                image={BitcoinImage}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
