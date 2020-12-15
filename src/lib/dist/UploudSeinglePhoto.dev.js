"use strict";

var PhotosUploadUsers = {
  files: [],
  priview: document.querySelector(".priview-photo-users"),
  uploudLimit: 1,
  input: "",
  FilesInputUser: function FilesInputUser(event) {
    var fileList = event.target.files; //Transform em lista de array os ficheiro ou 
    //photos

    Array.from(fileList).forEach(function (file) {
      // chamar a function Le os Ficheiros
      var reader = new FileReader(); // enviar cada ficheiro lido dentro array file

      PhotosUploadUsers.files.push(file);

      for (var tamanho = 1; tamanho < fileList.length; fileList.slice - 1) {
        return;
      }

      console.log(fileList); //Lendo os ficheiros

      reader.onload = function () {
        var image = new Image();
        image.src = String(reader.result);
        var div = PhotosUploadUsers.getContainer(image);
        PhotosUploadUsers.priview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });
  },
  getAllFiles: function getAllFiles() {
    var dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUploadUsers.files.forEach(function (file) {
      return dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  },
  getContainer: function getContainer(image) {
    var div = document.createElement('div');
    div.classList.add('avatar-single'); // div.onclick  = PhotosUploadUsers.removePhotos

    div.appendChild(image);
    return div;
  } // getRemoveButton(){
  //     const button = document.createElement('i')
  //     button.classList.add('material-icons')
  //     button.innerHTML = "close"
  //     return button
  // },
  // removePhotos(event){
  //     const photoDiv = event.target.parentNode
  //     const photosArray = Array.from(PhotosUploadUsers.priview.children)
  //     const index = photosArray.indexOf(photoDiv)
  //     PhotosUploadUsers.files.splice(index, 1)
  //     PhotosUploadUsers.input.files = PhotosUploadUsers.getAllFiles()
  //     photoDiv.remove()
  // },
  // removeOldPhotos(event){
  //     const photoSingle = event.target.parentNode
  //     if(photoSingle){
  //         const input_hidden = document.querySelector('input[name="removed_files"]')
  //         if(input_hidden){
  //             input_hidden.value += `${photoSingle.id},`
  //         }
  //     }
  //     photoSingle.remove()
  //     }

};