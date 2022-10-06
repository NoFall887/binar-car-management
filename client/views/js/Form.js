class Form {
  static inputs = document.querySelectorAll("#car-form input");
  static select = document.querySelector("select");
  static init() {
    // get initial data
    this.loadInitData();
    // add event listeners
    this.inputs.forEach((input) => {
      input.addEventListener("input", Form.handleSaveButton);
    });
    this.inputs[this.inputs.length - 1].addEventListener(
      "input",
      Form.handleImgInput
    );
    this.select.addEventListener("change", Form.handleSaveButton);
    document.getElementById("car-form").onsubmit = Form.handleSubmit;
    this.handleSaveButton();
  }

  static loadInitData() {
    const searchParams = new URL(location.href).searchParams;
    if (searchParams.has("id")) {
      axios
        .get(`http://localhost:8000/cars/${searchParams.get("id")}`)
        .then((response) => {
          const data = response.data;
          [...this.inputs].slice(0, -1).forEach((input) => {
            console.log(input);
            input.value = data[input.name];
          });
          const fileText = document.getElementsByClassName("photo-input")[0];
          fileText.innerHTML = data.image;
          const option = document.querySelector(
            `option[value=${data.size.size}]`
          );
          option.setAttribute("selected", true);
        })
        .catch((err) => {
          alert(`${err} \n Please try again`);
        });
      searchParams.get("id");
    } else {
      return;
    }
  }

  static handleSaveButton() {
    const saveBtn = document.getElementById("save");
    for (const input of [...Form.inputs, Form.select]) {
      if (input.value === "") {
        !saveBtn.hasAttribute("disabled") &&
          saveBtn.toggleAttribute("disabled");
        return;
      }
    }
    if (saveBtn.hasAttribute("disabled")) {
      saveBtn.toggleAttribute("disabled");
    }
  }

  static handleImgInput(e) {
    const fileElement = e.target;
    const imgInputText = document.getElementsByClassName("photo-input")[0];

    if (fileElement.files[0].size > 2000000) {
      fileElement.value = "";
      alert("Ukuran foto maks. 2MB");
      return;
    }
    imgInputText.textContent = this.value;
  }

  static async handleSubmit(e) {
    e.preventDefault();
    const form = document.querySelector("#car-form");
    const formData = new FormData(form);

    let reqUrl = "http://localhost:8000/cars";
    let reqMethod = "post";

    if (location.href.split("/").pop() !== "new") {
      reqUrl = `http://localhost:8000/cars/${new URL(
        location.href
      ).searchParams.get("id")}`;
      reqMethod = "put";
    }

    await axios({
      method: reqMethod,
      url: reqUrl,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "http://localhost:8800?action=save";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

Form.init();
