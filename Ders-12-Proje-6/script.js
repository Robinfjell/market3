const url = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function () {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      data.forEach(function (veri) {
        ekranaYazdir(veri);
      });
    });
});

const row = document.querySelector(".row");
const ekranaYazdir = (veri) => {
  row.innerHTML += `
    <div class="col-4 mb-4">
        <div class="card boyut">
            <img src="${veri.image}" class="card-img-top resim" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title stil">${veri.title}</h5>
                <p class="card-price pozisyon2 fs-3 fw-bold">${veri.price}$</p>
                <a id="addBtn" href="#" class="btn btn-primary pozisyon">Sepete Ekle</a>
            </div>
        </div>
    </div>
    `;
};

// ! Ürünler İçerisinde İsme Göre Filtreleme Yaptırmak İçin;
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let searchText = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  // console.log(searchText)

  let cards = document.querySelectorAll(".col-4");
  // console.log(cards);

  cards.forEach(function (card) {
    let title = card.querySelector(".card-title");
    // console.log(title)

    if (
      title.innerHTML.trim().toLocaleLowerCase("tr-TR").includes(searchText)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// ! Sepete Ekle Butonuna Bastığımda İconun Değerinin Artması İçin;
row.addEventListener("click", function (e) {
  // console.log(e.target);
  if (e.target.id.includes("addBtn")) {
    const littleBox = document.querySelector(".little-box");
    littleBox.innerHTML++;

    let parentDiv = e.target.parentElement.parentElement;
    console.log(parentDiv);

    sepeteEkle(parentDiv);
  }
});

// ! Sepet İçerisindeki İşlemler
const sepeteEkle = (parentDiv) => {
  const li = document.querySelector(".modal-li");
  const productName = parentDiv.children[1].children[0].innerHTML;
  console.log(productName);

  const price = parentDiv.children[1].children[1].innerHTML;
  console.log(price);

  const image = parentDiv.children[0].src;
  console.log(image);

  const ürünBilgisi = document.createElement("div");
  ürünBilgisi.classList.add(
    "ürün-bilgisi",
    "d-flex",
    "align-items-center",
    "justify-content-around"
  );

  ürünBilgisi.innerHTML += `
    <div class="fotograf">
    <img width="100px" height="100px" src="${image}" alt="">
    </div>
    <div class="baslik">${productName}</div>
    <div class="butonlar">
        <button id="arttir" class="btn btn-success">+</button>
        <span class="adet">1</span>
        <button id="azalt" class="btn btn-danger">-</button>
    </div>
    <div class="fiyat">${price}</div>
    <div class="toplamFiyat">${price}</div>
    <i id="icon" class="fa-solid fa-circle-xmark fs-3"></i>
    `

    li.append(ürünBilgisi);

    // ! Sepet İçerisindeki arttır ve azalt butonları;
    const arttir = ürünBilgisi.querySelector("#arttir");
    const azalt = ürünBilgisi.querySelector("#azalt");
    const adet = ürünBilgisi.querySelector(".adet");
    const toplamFiyat = ürünBilgisi.querySelector(".toplamFiyat");

    arttir.addEventListener("click", function(){
        adet.innerHTML++;
        toplamFiyat.innerHTML = `${(adet.innerHTML * parseFloat(price)).toFixed(2)}$`
    })

    azalt.addEventListener("click", function(){
        if(adet.innerHTML != 0){
            adet.innerHTML--;
            toplamFiyat.innerHTML = `${(adet.innerHTML * parseFloat(price)).toFixed(2)}$`
        }
    })
};


// ! Sepetteki Çarpı Butonuna Bastığımda Ürünü Sildirmek İçin;
document.addEventListener("click", function(e){
    if(e.target.className.includes("fa-solid")){
        // console.log(e.target.parentElement);
        let productElement = e.target.parentElement;
        productElement.remove();

        const littleBox = document.querySelector(".little-box");
        if(littleBox.innerHTML !=0){
            littleBox.innerHTML--;
        }
    }
})


// ! Ödevler
// 1) Sepet içerisindeki ürün adeti 0'a düştüğünde o ürün silinsin.
// 2) Sepet içerisine eklenen her bir ürünün fiyatlarının toplamı en alta yazdırılsın.
// 3) Dropdown menüsünde kategoriye göre tıkladığım kategorideki ürünler listelensin.
// 17.06.2024 son tarih!