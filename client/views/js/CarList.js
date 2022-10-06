class CarList {
  static async fetchCars() {
    await axios
      .get("http://localhost:8000/cars")
      .then((response) => {
        Car.init(response.data);
      })
      .catch((err) => {
        alert(`${err} \n Please try again`);
      });
  }

  static async init() {
    // display cars
    await this.fetchCars();
    const carListContainer = document.getElementById("car-list");
    Car.list.forEach((car) => {
      carListContainer.innerHTML += car.render();
    });
  }

  static deleteCar() {}
}

CarList.init();
