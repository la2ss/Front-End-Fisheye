
//Mettre le code JavaScript lié à la page photographer.html

//Récupère l'ID du photographe recherché dans l'URL
const photographerUrl = window.location.search;
const urlParams = new URLSearchParams(photographerUrl);
const photographerId = urlParams.get("id");
   
console.log(photographerUrl);

// Récupère les données du fichier json avc la requete fetch
async function getPhotographers() {
    return fetch("./data/photographers.json")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        
        .catch(function (error) {
            console.log(error);
        });
        
  }
//Affiche les données du photographe correspondant à l'ID
async function displayData(currentMedias, currentPhotographer, lightbox) {

  
    const photographerFactory = new PhotographerFactory(currentPhotographer);
    photographerFactory.getUserHeaderCardDOM();
    const modalName = document.querySelector(".modal header h2");
    modalName.insertAdjacentHTML("beforeend", "<br/>" + currentPhotographer.name);
    modalName.setAttribute("aria-labelledby", "Contact Me, " + currentPhotographer.name);

    const totalCard = photographerFactory.totalLikesCounterCard();
    const mainSection = document.querySelector("main");
    mainSection.appendChild(totalCard);

    const mediasSection = document.querySelector(".media-section");
    let sortedMedias = currentMedias.slice(); 

    let likeSum = 0;
    sortedMedias.forEach(media => {
        const likeCount = parseInt(media.likes);
        likeSum += likeCount;
    });
    const totalCountSpan = totalCard.querySelector('.total-count');
    totalCountSpan.textContent = `${likeSum}`;

    const sortDropdown = document.querySelector(".sort-dropdown");
    sortDropdown.addEventListener("change", () => {
    const sortOption = sortDropdown.value;

        if (sortOption === "date") {
            sortedMedias.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
        } else if (sortOption === "title") {
            sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "popularity") {
            sortedMedias.sort((a, b) => b.likes - a.likes);
        }

        mediasSection.innerHTML = "";
        sortedMedias.forEach(media => {
          
            const photographerMedia = new MediaFactory(media, currentPhotographer, lightbox);
            const mediaCardDOM = photographerMedia.getMediaCardDOM();
            mediasSection.appendChild(mediaCardDOM);
        });

        let likeSum = 0;
        sortedMedias.forEach(media => {
            const likeCount = parseInt(media.likes);
            likeSum += likeCount;
        });
        totalCountSpan.textContent = `${likeSum}`;
    });

    sortedMedias.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
    sortedMedias.forEach(media => {
    
        const photographerMedia = new MediaFactory(media, currentPhotographer, lightbox);
        const mediaCardDOM = photographerMedia.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
       
    });

    
    
}


   
async function init() {
    const { photographers, media } = await getPhotographers();
    const currentPhotographer = photographers.find(id => id.id == photographerId);
    const currentMedias = media.filter(media => media.photographerId == photographerId);

     const lightbox = new LightBox(currentMedias, currentPhotographer);
     lightbox.init();

    displayData(currentMedias, currentPhotographer, lightbox);

   
}

init()

