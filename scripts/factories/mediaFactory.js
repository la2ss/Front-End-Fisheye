
class MediaFactory {
  constructor(mediaData, photographerData, lightbox) {

    this.mediaData = mediaData;
    this.image = mediaData.image;
    this.title = mediaData.title;
    this.video = mediaData.video;
    this.likes = mediaData.likes;
    this.name = photographerData.name;
    this.price = photographerData.price;

    this.lightbox = lightbox;
    const photographerName = this.name.split(" ");
    const firstName = photographerName[0];
    this.mediaPath = `assets/photographers/${firstName}/${this.image ? this.image : this.video}`;

  }


  getMediaCardDOM() {
    const eachCard = document.createElement("div");
    const infoCard = document.createElement("div");
    const p = document.createElement("p");
    const media = document.createElement(this.image ? "img" : "video");
    media.setAttribute("aria-label", `${this.title}` + ", closeup view");
    media.setAttribute("tabindex", "0");

    media.addEventListener("click", () => {
      const mediaIndex = this.lightbox.mediasData.findIndex(media =>
        media.title === this.title
      )

      this.lightbox.show()
      this.lightbox.updateMedia(mediaIndex)

    }
    )

    media.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const mediaIndex = this.lightbox.mediasData.findIndex(media => media.title === this.title);
        this.lightbox.show();
        this.lightbox.updateMedia(mediaIndex);
      }
    });


    const likeBtn = document.createElement("span");
    const likeHeart = document.createElement("i");
    const likeCounter = document.createElement("p");

    const totalCountUpdate = document.querySelector('.total-count');

    eachCard.classList.add("eachcard");
    infoCard.classList.add("infocard");
    likeHeart.classList.add("fa-regular", "fa-heart");
    likeHeart.setAttribute("aria-label", "likes");
    likeHeart.setAttribute("tabindex", "0");

    likeHeart.addEventListener("click", () => {
      if (likeHeart.classList.contains("fa-regular")) {
        likeHeart.classList.remove("fa-regular");
        likeHeart.classList.add("fa-solid");
        this.likes++;
        likeCounter.textContent = `${this.likes}`;
        totalCountUpdate.textContent = (parseInt(totalCountUpdate.textContent) + 1);

      } else {
        likeHeart.classList.remove("fa-solid");
        likeHeart.classList.add("fa-regular");
        this.likes--;
        likeCounter.textContent = `${this.likes}`;
        totalCountUpdate.textContent = ((totalCountUpdate.textContent) - 1);
      }

    });

    likeHeart.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (likeHeart.classList.contains("fa-regular")) {
          likeHeart.classList.remove("fa-regular");
          likeHeart.classList.add("fa-solid");
          this.likes++;
          likeCounter.textContent = `${this.likes}`;
          totalCountUpdate.textContent = (parseInt(totalCountUpdate.textContent) + 1);
        } else {
          likeHeart.classList.remove("fa-solid");
          likeHeart.classList.add("fa-regular");
          this.likes--;
          likeCounter.textContent = `${this.likes}`;
          totalCountUpdate.textContent = (parseInt(totalCountUpdate.textContent) - 1);
        }
      }
    });


    //on recupere les donnees de chaque cards
    p.textContent = `${this.title}`;
    likeCounter.textContent = `${this.likes}`;
    likeCounter.classList.add("media-likes");
    media.src = this.mediaPath;
    eachCard.appendChild(media);
    eachCard.appendChild(infoCard);

    infoCard.appendChild(p);
    infoCard.appendChild(likeBtn);
    likeBtn.appendChild(likeCounter);
    likeBtn.appendChild(likeHeart);

    return eachCard;


  }



}
