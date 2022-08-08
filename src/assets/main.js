const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITE = "https://api.thecatapi.com/v1/favourites?api_key=5f17e605-1287-40ce-a3a9-60b8ce503f6b";
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";
const API_URL_DELETE = (id)=> `https://api.thecatapi.com/v1/favourites/${id}?api_key=5f17e605-1287-40ce-a3a9-60b8ce503f6b`;
const btnRandom = document.querySelector("#btnAleatorio");

btnRandom.addEventListener("click", loadMichisAleatorios);




async function loadMichisAleatorios(){
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const btnfavorite1 = document.querySelector("#btnfavorite1");
    const btnfavorite2 = document.querySelector("#btnfavorite2");



    img1.src = data[0].url;
    img2.src = data[1].url;

    btnfavorite1.addEventListener("click", () => saveMichiFavorite(data[0].id))
    btnfavorite2.addEventListener("click", () => saveMichiFavorite(data[1].id))
    console.log(data)
}



async function loadMichisFavorites(){
    const response = await fetch(API_URL_FAVORITE)
    const data = await response.json();

    const secctioPrincipal = document.querySelector("#michisFavorito");
    secctioPrincipal.innerHTML=  " ";
    data.map(michis=>{
        
        const michisFavorito = document.querySelector("#michisFavorito")
        const section = document.createElement("section");
        const img = document.createElement("img");
        const button = document.createElement("button")
        const buttonText = document.createTextNode("🧨")
        
        button.appendChild(buttonText)
        button.addEventListener("click", () => deleteMichiFavorite(michis.id));
        img.src = michis.image.url
        section.appendChild(img);
        section.appendChild(button);
        michisFavorito.appendChild(section)

    });
}


async function saveMichiFavorite(id){
    const response = await fetch(API_URL_FAVORITE, {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            image_id: id,
        })
    })
    loadMichisFavorites();
    
}

async function deleteMichiFavorite(id){
    const response = await fetch(API_URL_DELETE(id),{
        method: "DELETE",
    })
    const data = response.json();
    loadMichisFavorites();
}



async function uptoloadPhoto(){
    const form = document.querySelector("#michiForm");
    const formData = new FormData(form);
    console.log(formData.get("file"))


    const response = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers:{
            "X-API-KEY": "5f17e605-1287-40ce-a3a9-60b8ce503f6b",
            // "Content-Type" : "multipart/form-data",
        },
        body: formData,
    })
    console.log(response)
}




loadMichisAleatorios();
loadMichisFavorites();