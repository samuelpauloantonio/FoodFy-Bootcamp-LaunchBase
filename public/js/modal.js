const single_menu = document.querySelectorAll(".menu_single")
const modal = document.querySelector(".modal")
const close = document.querySelector("p.close")
const logo = window.document.querySelector(".logo")

logo.addEventListener("click", function(){
  return location.href = "/"
})


for(let menu of single_menu){
  menu.addEventListener("click", function(){
    modal.classList.add("active")

    const srcImg =  menu.querySelector("img").getAttribute("src")
    modal.querySelector("img").src= `${srcImg}`

    const title = menu.querySelector("h2").textContent
    modal.querySelector("h2").innerText = `${title}`

    const author = menu.querySelector("p.author").textContent
    modal.querySelector("p.author2").innerText = `${author}`

   
  })
}

close.addEventListener("click", function(){
  modal.classList.remove("active")
})

//location



  
