class CarList {
  static deleteIdTemp = null;
  static carListContainer = document.getElementById("car-list");
  static async fetchCars(size = null) {
    let option = {};
    if (size) {
      option.params = {
        size: size,
      };
    }
    await axios
      .get("http://localhost:8000/cars", option)
      .then((response) => {
        Car.init(response.data);
      })
      .catch((err) => {
        alert(`${err} \n Please try again`);
      });

    Car.list.forEach((car) => {
      this.carListContainer.innerHTML += car.render();
    });
  }
  static clearCars() {
    this.carListContainer.innerHTML = "";
  }
  static async init() {
    // display cars
    await this.fetchCars();

    // add event listeners
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.onclick = (e) => {
        CarList.deleteIdTemp = e.target.value;
      };
    });

    document.getElementById("confirm-delete").onclick = CarList.confirmDelete;

    document.querySelectorAll(".btn-check").forEach((btn) => {
      btn.onchange = async (e) => {
        CarList.clearCars();
        await CarList.fetchCars(e.target.value);
      };
    });
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
