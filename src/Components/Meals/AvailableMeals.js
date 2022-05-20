import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-d74ee-default-rtdb.firebaseio.com/meals.json"
      );
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
    };
    fetchMeals();
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
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
export default AvailableMeals;
