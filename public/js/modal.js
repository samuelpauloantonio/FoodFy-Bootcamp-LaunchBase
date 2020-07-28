const single_menu = document.querySelectorAll(".menu_single")
const modal = document.querySelector(".modal")
const close = document.querySelector("p.close")

for(let menu of single_menu){
  menu.addEventListener("click", function(){
    modal.classList.add("active")
  })
}

close.addEventListener("click", function(){
  modal.classList.remove("active")
})