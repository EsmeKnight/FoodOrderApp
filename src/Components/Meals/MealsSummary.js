import classes from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food Delivered to you</h2>
      <p>
        Choose your favourite meal from our selection and enjoy a delicious
        lunch or dinner at home.
      </p>
      <p>
        All meals are cooked with high quality ingredients fresh daily by our
        experienced chefs
      </p>
    </section>
  );
}

export default MealsSummary;
