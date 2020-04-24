import query from "../query.js";
const logoutLink = document.querySelector('#navbar__links--logout');

// logoutLink.innerHTML = `<a href="#" class="navbar__links--logout--link">LOGOUT</a>`;

function dogToggle() {
  const dogs = document.querySelectorAll(".dog");
  dogs.forEach((dog) => {
    dog.classList.toggle("dog--hidden");
  });
}

function createDogElement(dogArr) {
  const app = document.querySelector("#app");
  const pageHeading = document.createElement("h2");
  pageHeading.textContent = "Bark up the right tree today 🦴";
  pageHeading.classList.add("see_dogs__heading");
  const toggle = document.createElement("button");
  toggle.textContent = "See my doggo";
  toggle.classList.add("see-dogs__toggle");
  toggle.addEventListener("click", dogToggle);

  toggle.addEventListener("click", () => {
    if (toggle.textContent === "See my doggo") {
      toggle.textContent = "See other doggos";
    } else {
      toggle.textContent = "See my doggo";
    }
  });

  app.appendChild(pageHeading);
  app.append(toggle);
  dogArr.map((dog) => {
    const dogCard = document.createElement("article");
    const name = document.createElement("h2");
    const breed = document.createElement("p");
    const photo = document.createElement("img");
    const owner = document.createElement("h3");

    dogCard.classList.add("dog");
    if (dog.owner == localStorage.getItem("id")) {
      dogCard.classList.add("dog--hidden");
    }

    // console.log(dog.owner);
    // console.log(localStorage.getItem("id"));
    dogCard.classList.add("dog__card");
    name.classList.add("dog__name");
    breed.classList.add("dog__breed");
    photo.classList.add("dog__photo");
    owner.classList.add("dog__owner");

    name.innerText = dog.name;
    breed.innerText = dog.breed;
    photo.src = dog.image;
    photo.alt = "photo of " + dog.name;
    owner.innerText = dog.owner;

    dogCard.appendChild(owner);
    dogCard.appendChild(photo);
    dogCard.appendChild(name);
    dogCard.appendChild(breed);

    app.appendChild(dogCard);
  });
}

function home() {
  fetch("https://dogs-rest.herokuapp.com/v1/dogs/", {})
    .then((response) => response.json())
    .then((dogs) => {
      createDogElement(dogs);
    })
    .catch(console.error);
}

export default home;
