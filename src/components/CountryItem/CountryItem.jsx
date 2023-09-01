import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { flag, countryCode } = country;

  return (
    <li className={styles.countryItem}>
      <img
        className={styles.flag}
        src={!!flag ? flag : ""}
        alt={!!countryCode ? countryCode : ""}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
