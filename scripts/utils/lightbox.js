
class LightBox {
  constructor(mediasData, photographerData) {
    this.galleryIndex = 0;
    this.modal = null;
    this.isOpen = false;
    
    this.photographerData = photographerData;
    this.name = photographerData.name;
    const photographerName = this.name.split(" ");
    const firstName = photographerName[0];
    this.mediasData = mediasData;
   
    this.mediaPath = `assets/photographers/${firstName}/`;

    this.generateModal()
    this.hide()
  
}

  generateModal() {
    
    const isImage = this.mediasData[0]
    const mediaHTML = isImage
      ? `<img class="media" src="${this.mediaPath}">`
      : `<video class="media" src="${this.mediaPath}" autoplay controls></video>`

    const modalHTML = `
      <div class="lightbox-modal">
      <button class="close-btn"></button>
        <div class="lightbox-content">
          
          <button class="prev-btn"></button>
          <div class="media-container">
            <div class="media-content">
              ${mediaHTML}
            </div>
            <div class="media-info">
              <h2 class="media-title">${this.title}</h2>
            </div>
          </div>
          
           
            <button class="next-btn"></button>
          
        </div>
      </div>
    `;

    const main = document.querySelector("main");
    main.insertAdjacentHTML("beforeend", modalHTML);
    this.modal = document.querySelector(".lightbox-modal");
    const closeBtn = this.modal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      this.hide();
      
    });

    const prevBtn = this.modal.querySelector(".prev-btn");
    prevBtn.addEventListener("click", () => {
      this.prevMedia();
    });

    const nextBtn = this.modal.querySelector(".next-btn");
    nextBtn.addEventListener("click", () => {
      this.nextMedia();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.hide();
      } else if (event.key === "ArrowLeft") {
        this.prevMedia();
      } else if (event.key === "ArrowRight") {
        this.nextMedia();
      }
      

    });
  }

  show() {
    
    this.modal.style.display = "block";
    this.modal.setAttribute('aria-hidden', 'false');
    
      this.isOpen = true;
    
  }

  hide() {
    
    this.modal.style.display = "none";
    this.modal.setAttribute('aria-hidden', 'true');
    
      this.isOpen = false;
  }

  updateMedia(mediaIndex) {
    this.galleryIndex = mediaIndex;
    const mediaContainer = this.modal.querySelector(".media-content");
    const media = this.mediasData[this.galleryIndex];

    if (media.image) {
      mediaContainer.innerHTML = `<img class="media" src="${this.mediaPath}${media.image}" aria-label="${media.title}, close-up view">`;
    } else if (media.video) {
      mediaContainer.innerHTML = `<video class="media" src="${this.mediaPath}${media.video}" autoplay controls aria-label="${media.title}, close-up view"></video>`;
    }
    const title = this.modal.querySelector(".media-title");
    title.textContent = media.title;
    const indexDisplay = this.modal.querySelector(".media-index");
    indexDisplay.textContent = `${this.galleryIndex + 1}/${this.mediasData.length}`;

  }
  

  prevMedia() {
    if (this.galleryIndex > 0) {
      this.galleryIndex--;
    } else {
      this.galleryIndex = this.mediasData.length - 1;
    }
    this.updateMedia(this.galleryIndex);
  }

  nextMedia() {
    if (this.galleryIndex < this.mediasData.length - 1) {
      this.galleryIndex++;
    } else {
      this.galleryIndex = 0;
    }
    this.updateMedia(this.galleryIndex);
  }

  init() {
    const mediaList = document.querySelectorAll('.eachcard img, .eachcard video');
    mediaList.forEach((media) => {
      media.addEventListener('click', () => {
        const selectedMediaName = media.name
        const mediaIndex = this.mediasData.findIndex(media =>
          media.title === selectedMediaName
          )
        this.updateMedia(mediaIndex);
        this.show();
      });
    });
    
  }
  
  
}