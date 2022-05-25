import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-http-d74ee-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const meals = await response.json();

      const loadedMeals = [];
      for (const key in meals) {
        loadedMeals.push({
          id: key,
          name: meals[key].name,
          price: meals[key].price,
          description: meals[key].description,
        });
      }
      setMealData(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = mealData.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });
  if (httpError) {
    return (
      <Card>
        <p className={classes.loadingMeals}>{httpError}</p>
      </Card>
    );
  } else {
    return (
      <section className={classes.meals}>
        <Card>
          {isLoading && <p className={classes.loadingMeals}>Loading...</p>}
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  }
}
export default AvailableMeals;
