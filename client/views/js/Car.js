class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => {
      return new this(i);
    });
  }

  constructor({ id, name, image, rentPerDay, size, updatedAt }) {
    this.id = id;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.name = name;
    this.size = size;
    this.updatedAt = new Date(updatedAt);
  }

  render() {
    return `
    <div class="car-card rounded-3 p-3 shadow-sm flex-grow-0">
    <img src="${this.image}" class="car-img mb-3">
    <p class="mb-1">${this.name}</p>
    <p class="price fw-bold">Rp.${this.rentPerDay} / hari</p>
    <p class="mb-4"> <img src="./assets/fi_clock.svg"> Updated at 4 ${this.updatedAt.toLocaleString()}</p>
    <div class="d-flex gap-3">
      <button data-bs-toggle="modal" data-bs-target="#delete-modal" class="delete-btn btn btn-outline-danger d-flex align-items-center gap-2 py-2 px-4 justify-content-center">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 4.5H3H15" stroke="#dc3545" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M5.25 4.5V3C5.25 2.60218 5.40804 2.22064 5.68934 1.93934C5.97064 1.65804 6.35218 1.5 6.75 1.5H9.75C10.1478 1.5 10.5294 1.65804 10.8107 1.93934C11.092 2.22064 11.25 2.60218 11.25 3V4.5M13.5 4.5V15C13.5 15.3978 13.342 15.7794 13.0607 16.0607C12.7794 16.342 12.3978 16.5 12 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V4.5H13.5Z"
            stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Delete
      </button>
      <a href="./edit/${
        this.id
      }" role="button" class="btn btn-success d-flex align-items-center gap-2 py-2 px-4 justify-content-center">
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_39210_3800)">
            <path
              d="M9 3H3.75C3.35218 3 2.97064 3.15804 2.68934 3.43934C2.40804 3.72064 2.25 4.10218 2.25 4.5V15C2.25 15.3978 2.40804 15.7794 2.68934 16.0607C2.97064 16.342 3.35218 16.5 3.75 16.5H14.25C14.6478 16.5 15.0294 16.342 15.3107 16.0607C15.592 15.7794 15.75 15.3978 15.75 15V9.75"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M14.625 1.875C14.9234 1.57663 15.328 1.40901 15.75 1.40901C16.172 1.40901 16.5766 1.57663 16.875 1.875C17.1734 2.17337 17.341 2.57805 17.341 3C17.341 3.42196 17.1734 3.82663 16.875 4.125L9.75 11.25L6.75 12L7.5 9L14.625 1.875Z"
              stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_39210_3800">
              <rect width="18" height="18" fill="white" transform="translate(0.75)" />
            </clipPath>
          </defs>
        </svg>
        Edit
      </a>
    </div>
  </div>
    `;
  }
}
