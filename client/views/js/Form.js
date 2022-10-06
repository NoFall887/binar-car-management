class Form {
  static inputs = document.querySelectorAll("#car-form input");
  static select = document.querySelector("select");
  static init() {
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
    await axios
      .postForm("http://localhost:8000/cars", formData)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "http://localhost:8000?action=save";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

Form.init();
