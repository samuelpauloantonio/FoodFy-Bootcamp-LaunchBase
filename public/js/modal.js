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

    const title = menu.querySelector("h2").textContent

    const author2 = menu.querySelector("p.author").textContent

    modal.querySelector("h2").innerText = `${title}`
    modal.querySelector("p.author2").innerText = `${author2}`

    modal.querySelector("img").src= `${srcImg}`
  })
}

close.addEventListener("click", function(){
  modal.classList.remove("active")
})

//location



  
