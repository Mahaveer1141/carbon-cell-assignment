import "@/styles/card.scss";
import Image, { StaticImageData } from "next/image";

interface IProps {
  image: StaticImageData;
  currency: string;
  price: string;
  cryptoName: string;
}

export default function Card({ image, currency, price, cryptoName }: IProps) {
  return (
    <div className="card__container">
      <div className="card__header">
        <Image className="card__icon" src={image} alt="bitcoin image" />
        <div className="card__currency">In {currency}</div>
      </div>
      <div className="card__text">{cryptoName} Price: </div>
      <div className="card__price">
        <span className="card__price-currency">{currency}</span> {price}
      </div>
    </div>
  );
}
