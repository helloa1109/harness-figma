import type { HTMLAttributes } from "react";
import "./TripCard.css";

interface TripCardProps extends HTMLAttributes<HTMLElement> {
  image?: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: string;
  price: string;
  duration?: string;
}

export function TripCard({
  image,
  title,
  location,
  rating,
  reviewCount,
  price,
  duration,
  className,
  ...rest
}: TripCardProps) {
  return (
    <article
      className={`trip-card${className ? ` ${className}` : ""}`}
      aria-label={`${title} — ${location}`}
      {...rest}
    >
      <div className="trip-card__cover" aria-hidden={!image}>
        {image ? (
          <img src={image} alt={`${title} 사진`} className="trip-card__cover-img" />
        ) : null}
      </div>

      <div className="trip-card__content">
        <h3 className="trip-card__title">{title}</h3>
        <p className="trip-card__location">{location}</p>
        {duration ? <p className="trip-card__duration">{duration}</p> : null}
      </div>

      <div className="trip-card__meta">
        <p className="trip-card__rating" aria-label={`별점 ${rating}점, 리뷰 ${reviewCount}개`}>
          <span aria-hidden="true">★</span> {rating} ({reviewCount})
        </p>
        <p className="trip-card__price">{price}</p>
      </div>
    </article>
  );
}
