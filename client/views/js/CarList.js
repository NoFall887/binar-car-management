class CarList {
  static deleteIdTemp = null;

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

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.onclick = (e) => {
        CarList.deleteIdTemp = e.target.value;
      };
    });

    document.getElementById("confirm-delete").onclick = CarList.confirmDelete;
  }

  static confirmDelete() {
    axios
      .delete(`http://localhost:8000/cars/${CarList.deleteIdTemp}`)
      .then((response) => {
        location.href = "http://localhost:8800?action=delete";
      })
      .catch((err) => {
        alert(err);
      });
  }
}

CarList.init();
