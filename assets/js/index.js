// WRITE YOUR JS CODE HERE

const API_KEY = "uFtDHo4SJhxePleQK8XZu1zwwxVMlHWnshQyRR4m";

const apodDate = document.getElementById("apod-date");
const apodDateInput = document.getElementById("apod-date-input");
const apodImage = document.getElementById("apod-image");
const apodLoading = document.getElementById("apod-loading");
const apodTitle = document.getElementById("apod-title");
const apodExplanation = document.getElementById("apod-explanation");
const apodDateDetail = document.getElementById("apod-date-detail");
const apodCopyright = document.getElementById("apod-copyright");
const apodDateInfo = document.getElementById("apod-date-info");
const apodMediaType = document.getElementById("apod-media-type");
const apodMedia = document.getElementById("apod-media");
const apodFullScreenBtn = document.getElementById("apod-full-screen-btn");
const fullScreenBtnContainer = document.getElementById("full-screen-btn-container");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

async function getSpaceToday(selectedDate) {
  // let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

  if (selectedDate) {
    url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`;
  }

  try {
    apodLoading.classList.remove("hidden");

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    displayData(data);
  } catch (error) {
    console.log(error);
  } finally {
    apodLoading.classList.add("hidden");
  }
}

getSpaceToday();

function displayData(dataInfo) {
  let todayDate = new Date(dataInfo.date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  let customDate = new Date(dataInfo.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  console.log(todayDate);
  apodDate.innerHTML = `Astronomy Picture of the Day - ${todayDate}`;
  apodDateInput.value = dataInfo.date;
  apodDateInput.max = new Date(dataInfo.date).toLocaleString().split(",")[0];

  //   console.log(new Date(dataInfo.date).toLocaleString().split(",")[0]);

  apodDateInput.nextElementSibling.innerHTML = customDate;

  if (dataInfo.media_type === "image") {
    apodMedia.innerHTML = `<img id="apod-image" class="w-full h-full object-cover" src="${dataInfo.url}" alt="${dataInfo.title}" />`;

    fullScreenBtnContainer.classList.remove("hidden");
  }

  if (dataInfo.media_type === "video") {
    apodMedia.innerHTML = `<iframe id="apod-video" class="w-full h-full" src="${dataInfo.url}" frameborder="0" allowfullscreen></iframe>`;

    fullScreenBtnContainer.classList.add("hidden");
  }

  apodTitle.innerHTML = dataInfo.title;
  apodExplanation.innerHTML = dataInfo.explanation;
  apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${todayDate}`;
  apodCopyright.innerHTML = dataInfo.copyright
    ? `Copyright © ${dataInfo.copyright}`
    : "";
  apodMediaType.innerHTML = dataInfo.media_type;

  apodFullScreenBtn.addEventListener("click", function () {
    const img = apodMedia.querySelector("img");
    if (img) {
      img.requestFullscreen();
    }
  });
}

apodDateInput.addEventListener("change", function () {
  const selectedDate = this.value;
  if (!selectedDate) return;

  getSpaceToday(selectedDate);
});

let targetSection ;

navLinks.forEach((link) => {
  link.addEventListener("click", function(){
targetSection = link.getAttribute("data-section");
console.log(targetSection);

sections.forEach((section) => {
    if(section.getAttribute("data-section") === targetSection){
        section.classList.remove("hidden");
    }
    else{
        section.classList.add("hidden");
    }
    navLinks.forEach((link) => {
        link.classList.remove("active");
    })
    link.classList.add("active");
})
  })
  });



 async function getLaunch(){
    const response = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
    const {results} = await response.json();
    console.log(results);

    displayFirstCard(results[0]);
    displayOtherCards(results.slice(1, 10));

  }


  getLaunch();
  function displayFirstCard(launch){
    document.getElementById("featured-launch").innerHTML = `  <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launch.status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launch.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launch.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launch.rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${getDaysUntilLaunch(launch.net)}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${new Date(launch.net).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${new Date(launch.net).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit' ,hour12: true , timeZone:'UTC'})} UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launch.pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launch.pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launch.mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <img src="${launch.image.image_url}" alt="${launch.name}" class="object-cover w-full h-full" onerror="this.src='./assets/images/launch-placeholder.png'" />
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`
  }



  function getDaysUntilLaunch(date) {
    const currentDate = new Date();
    const launchDate = new Date(date);
    const timeDiff = launchDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    // console.log(daysDiff);
    return daysDiff>0? daysDiff : 0;
  }


  getDaysUntilLaunch();



  function displayOtherCards(launches) {

    let cartona = "";

    for (let i = 0; i < launches.length; i++) {
        cartona += `
        <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
                >
                 <img src="${launches[i].image.image_url}" alt="${launches[i].name}" class=" w-full h-full" onerror="./assets/images/launch-placeholder.png"/>
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launches[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(launches[i].net).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(launches[i].net).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit' ,hour12: true , timeZone:'UTC'})} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launches[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`

            
    }
    
  document.getElementById("launches-grid").innerHTML = cartona;
  }



  async function loadPlants(){
    const response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    const data = await response.json();
    console.log(data.bodies);

    displayPlanets(data.bodies);
  } 

  loadPlants();


  const planColors = {
    mercury: "#161512",
    venus: "#eab308",
    earth: "#3b82f6",
    mars: "#ef4444",
    jupiter: "#f97316",
    saturn: "#facc15",
    uranus: "#22d3ee",
    neptune: "#6366f1",
  }

  function displayPlanets(planets){
    var cartona = "";
    for(let i=0; i<planets.length; i++){
        cartona += `
        <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${planets[i].id}"
              style="--planet-color: ${planColors[planets[i].englishName.toLowerCase()]}"
              onmouseover="this.style.borderColor =  '${planColors[planets[i].englishName.toLowerCase()]}'"
              onmouseout="this.style.borderColor = '#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planets[i].image}"
                  alt="${planets[i].englishName}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planets[i].englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${(planets[i].semimajorAxis/149597870.7).toFixed(2)} AU</p>
            </div>`

  }
  document.getElementById("planets-grid").innerHTML = cartona;

  document.querySelectorAll(".planet-card").forEach((planetCard)=>{
    planetCard.addEventListener("click", function(){
        const planetId =planetCard.dataset.planetId;
        console.log(planetId);
        const planetObject = planets.find((planet)=> planet.id === planetId);
        console.log(planetObject);

        document.getElementById("planet-info-grid").innerHTML = `
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${planetObject.image}"
                    alt="${planetObject.englishName} planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${planetObject.englishName}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${planetObject.description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${(planetObject.semimajorAxis/1e6).toFixed(1)}M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                      ${planetObject.meanRadius}  Km                
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${planetObject.mass.massValue} × 10 <sup>${planetObject.mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${planetObject.density} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${planetObject.argPeriapsis} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${planetObject.sideralOrbit} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${planetObject.moons ? planetObject.moons.length : 0}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${planetObject.gravity} m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >Known since antiquity</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >Ancient</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >Planet</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">N/A</span>
                  </div>
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Only known planet with liquid water</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Atmosphere contains 78% nitrogen</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Magnetic field protects from solar wind</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Formed 4.54 billion years ago</span
                    >
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >147.1M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >152.1M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >0.0167</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >0.00°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >23.44°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">15°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >11.2 km/s</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>`
    }
  )})
}