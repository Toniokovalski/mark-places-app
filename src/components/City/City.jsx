import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCities } from "../../contexts/CitiesContext";
import BackButton from "../BackButton/BackButton";
import styles from "./City.module.css";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, date, notes, countryCode, flag } = currentCity;

  async function handleEdit(e) {
    e.preventDefault();
    navigate(
      `/app/form?lat=${currentCity.position.lat}&lng=${currentCity.position.lng}&type=edit`
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <img
            className={styles.flag}
            src={!!flag ? flag : ""}
            alt={!!countryCode ? countryCode : ""}
          />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.buttonsWrap}>
        <BackButton />
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default City;
