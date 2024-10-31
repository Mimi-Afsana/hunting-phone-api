const loadPhones = async (searchText, isShowAll) => {
  loadingSpinner(true)
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  dispalyPhones(phones, isShowAll);

}

const dispalyPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container')
  // clear before search result
  phoneContainer.textContent = ''


  if (phones.length > 12 && !isShowAll) {
    shoAll()
  }
  else {
    shoAllhidded()
  }

  console.log('show all result', isShowAll)

  // 10ta phone dekhabe
  console.log(phones.length)


  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }

  phones.forEach(phone => {
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-base-100 p-4 shadow-xl `
    phoneCard.innerHTML =
      `
        <figure class="px-10 pt-10">
                      <img
                        src="${phone.image}"
                        alt="Shoes"
                        class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title"> <span class="text-primary">Phone Name:</span>  ${phone.phone_name}</h2>
                      <h2 class="card-title"><span class="text-primary">Brand:</span> ${phone.brand}</h2>
                      <div class="card-actions">
                        <button onclick="showDetails('${phone.slug}'); show_details_modal.showModal()";   class="btn btn-success">Show Details</button>
                      </div>
                    </div>
        `;
    phoneContainer.appendChild(phoneCard)

  });
  //  hide loading spinner
  loadingSpinner(false)
}

// showall phones implements
const shoAll = () => {
  const show = document.getElementById('show-all')
  show.classList.remove("hidden");
}

// add hidden
const shoAllhidded = () => {
  const show = document.getElementById('show-all')
  show.classList.add("hidden");
}


// handle search field
const handleSearch = (isShowAll) => {
  // console.log("clicked")
  const searchField = document.getElementById('search-input')
  const searchTextValue = searchField.value
  loadPhones(searchTextValue, isShowAll)

}


// loading spinner implement
const loadingSpinner = (isLoading) => {
  const loading = document.getElementById('loading-spinner')
  if (isLoading) {
    loading.classList.remove('hidden')
  }
  else {
    loading.classList.add('hidden')
  }
}


// handle showAll
const handleShowAll = () => {
  // const showAll = document.getElementById('show-all')
  // console.log(showAll, 'clicked')
  handleSearch(true)
}


// show details each phone
const showDetails = async (id) => {
  // console.log(id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const eachPhoneDetails = await res.json();
  const data = eachPhoneDetails.data
  console.log(data)

  const each = document.getElementById("show_details_modal")
  each.textContent = ''
  const eachdiv = document.createElement('div')

  eachdiv.innerHTML = `
                    
                    <div class="modal-box">
                      <div class= "flex justify-center mb-4"><img  src="${data?.image}" alt="" /></div> 
                      <p class="font-bold">${data.name ? data.name : 'No Name Found'}</p>
                          <p><span class="text-primary font-bold">Release Date:</span>  ${data.releaseDate ? data.releaseDate : 'No Release Date Found'}</p>
                          <p> <span class="text-primary font-bold">Storage:</span> ${data.mainFeatures ? data.mainFeatures.storage : 'No Storage Information '}</p>
                          <p><span class="text-primary font-bold">Others:</span>  ${data.others ? data.others.Bluetooth : 'No Bluetooth Information'}</p>
                          <p><span class="text-primary font-bold">Sensor:</span>  ${data.mainFeatures.sensors ? data.mainFeatures.sensors[0] : 'no sensor'}</p>
                         <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
                            </form>
                        </div>
                    </div>
               
  `
  each.appendChild(eachdiv)
}
