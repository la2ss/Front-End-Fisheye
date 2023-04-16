
class PhotographerFactory {
    constructor({ name, id, city, country, tagline, price, portrait }) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
    }
    
    getUserCardDOM() {
        const article = document.createElement('article')

        article.innerHTML =
        `<a href="./photographer.html?id=${this.id}" aria-label="${this.name}">
            <img class="profil" src="assets/photographers/${this.portrait}" alt="Photo de profil de ${this.name}">
            <h1> ${this.name}</h1>
        </a>
        <div>
            <p> ${this.city}, ${this.country} </p>
            <p> ${this.tagline} </p>
            <p> ${this.price} € / jour</p>
        </div>`
        return (article);
    }

    getUserHeaderCardDOM() {
        const photographerHeader = document.querySelector('.photograph-header');
        const photographerInfo = document.createElement('div');
        const photographerLink = document.createElement('a');
        const photographerName = document.createElement('h1');
        const photographerCity = document.createElement('p');
        const photographerCountry = document.createElement('p');
        const photographerTagline = document.createElement('p');
        const photographerImg = document.createElement('div');
        const photographerProfileImg = document.createElement('img');
      
        photographerLink.href = `./photographer.html?id=${this.id}`;
        photographerLink.setAttribute('aria-label', this.name);
        photographerName.textContent = this.name;
        photographerCity.textContent = this.city;
        photographerCountry.textContent = this.country;
        photographerTagline.textContent = this.tagline;
        photographerProfileImg.src = `assets/photographers/${this.portrait}`;
        photographerProfileImg.alt = `Photo de profil de ${this.name}`;
      
        photographerLink.appendChild(photographerName);
        photographerInfo.appendChild(photographerLink);
        photographerInfo.appendChild(photographerCity);
        photographerInfo.appendChild(photographerCountry);
        photographerInfo.appendChild(photographerTagline);
        photographerImg.appendChild(photographerProfileImg);
        photographerHeader.appendChild(photographerInfo);
        photographerHeader.appendChild(photographerImg);
      
        photographerInfo.classList.add('photographer_info');
        photographerImg.classList.add('photographer_img');
        photographerProfileImg.classList.add('profil');
        photographerHeader.insertBefore( photographerInfo, photographerHeader.firstChild);
      
        return photographerHeader;
      }
      

    totalLikesCounterCard() {
        const likesCounterCard = document.createElement("div");
        likesCounterCard.id = "total-card";
        likesCounterCard.innerHTML = `<span class="total-count"></span><i class="fa-solid fa-heart"></i><span class="total-price">${this.price}€ / jour</span>`; 
        
        return likesCounterCard;
    }
}
