async function loadDogs() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await res.json();
    const carousel = document.getElementById('dog-carousel');
    carousel.innerHTML = '';
  
    data.message.forEach(img => {
      const imgTag = document.createElement('img');
      imgTag.src = img;
      imgTag.classList.add('slider-item');
      carousel.appendChild(imgTag);
    });
  
    new SimpleSlider('.slider', {
      autoplay: true,
      interval: 2000
    });
  }
  
  async function loadBreeds() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    const breeds = Object.keys(data.message);
    const container = document.getElementById('breed-buttons');
    container.innerHTML = '';
  
    breeds.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed;
      btn.classList.add('button-1'); // Custom styling here
      btn.setAttribute('data-breed', breed);
      btn.addEventListener('click', () => loadBreedInfo(breed));
      container.appendChild(btn);
    });
  }
  
  async function loadBreedInfo(breed) {
    const infoBox = document.getElementById('breed-info');
    document.getElementById('breed-name').textContent = breed;
  
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}_dog`);
      const wikiData = await wikiRes.json();
  
      document.getElementById('breed-description').textContent = wikiData.extract || "No description available.";
      document.getElementById('breed-life').textContent = wikiData.description?.includes("life span") ? wikiData.description : "Not available";
    } catch {
      document.getElementById('breed-description').textContent = "Description unavailable.";
      document.getElementById('breed-life').textContent = "Not available";
    }
  
    infoBox.style.display = "block";
  }
  
  if (annyang) {
    annyang.addCommands({
      'load dog breed *breed': (breed) => {
        const formatted = breed.toLowerCase().replace(/\s/g, '');
        loadBreedInfo(formatted);
      }
    });
  }
  
  loadDogs();
  loadBreeds();
  
