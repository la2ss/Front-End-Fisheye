async function getPhotographers() {
  try {
    const response = await fetch('./data/photographers.json');
    return response.json();
 
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {

    const photographerCard = new PhotographerFactory(photographer);
    const userCardDOM = photographerCard.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
  console.log(photographers);
}

init();

