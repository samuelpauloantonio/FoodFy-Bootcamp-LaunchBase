"use strict";

function redirect() {
  return window.location = '/';
} // MASCARA PARA MOEDA   


var Mask = {
  apply: function apply(input, formatAOA) {
    setTimeout(function () {
      input.value = Mask.formatAOA(input.value); //input.value = Mask[formatAOA](input.value)
    }, -1);
  },
  formatAOA: function formatAOA(value) {
    value = value.replace(/\D/g, "");
    return new Intl.NumberFormat('AOA', {
      style: 'currency',
      currency: 'AKZ'
    }).format(value / 100);
  }
}; /// uploud Image-galery

var PhotosUpload = {
  files: [],
  priview: document.querySelector('.priview-photo'),
  uploudLimit: 5,
  input: "",
  FilesInput: function FilesInput(event) {
    var fileList = event.target.files;
    if (PhotosUpload.hasLimit(event)) return; //Transform em lista de array os ficheiro ou 
    //photos

    Array.from(fileList).forEach(function (file) {
      // chamar a function Le os Ficheiros
      var reader = new FileReader(); // enviar cada ficheiro lido dentro array file

      PhotosUpload.files.push(file); //Lendo os ficheiros

      reader.onload = function () {
        var image = new Image();
        image.src = String(reader.result);
        var div = PhotosUpload.getContainer(image);
        PhotosUpload.priview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });
  },
  hasLimit: function hasLimit(event) {
    var uploudLimit = PhotosUpload.uploudLimit,
        input = PhotosUpload.input,
        priview = PhotosUpload.priview;
    var fileList = event.target.files;

    if (fileList.length > uploudLimit) {
      alert("Envie no m\xE1ximo ".concat(uploudLimit, " fotos"));
      event.preventDefault();
      return true;
    }

    var photoDiv = [];
    priview.childNodes.forEach(function (item) {
      if (item.classList && item.classList.value == "photo-single") {
        photoDiv.push(item);
      }
    });
    var totalPhotos = fileList.length + photoDiv.length;

    if (totalPhotos > uploudLimit) {
      alert('Você atingiu o limite máximo de  fotos');
      event.preventDefault();
      return true;
    }

    return false;
  },
  getAllFiles: function getAllFiles() {
    var dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUpload.files.forEach(function (file) {
      return dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  },
  getContainer: function getContainer(image) {
    var div = document.createElement('div');
    div.classList.add("photo-single");
    div.onclick = PhotosUpload.removePhotos;
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());
    return div;
  },
  getRemoveButton: function getRemoveButton() {
    var button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = "close";
    return button;
  },
  removePhotos: function removePhotos(event) {
    var photoDiv = event.target.parentNode;
    var photosArray = Array.from(PhotosUpload.priview.children);
    var index = photosArray.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    photoDiv.remove();
  },
  removeOldPhotos: function removeOldPhotos(event) {
    var photoSingle = event.target.parentNode;

    if (photoSingle) {
      var input_hidden = document.querySelector('input[name="removed_files"]');

      if (input_hidden) {
        input_hidden.value += "".concat(photoSingle.id, ",");
      }
    }

    photoSingle.remove();
  }
}; // Banner  Main 

var SetImage = {
  imageMain: document.querySelector('.image-main > img'),
  bannerMain: function bannerMain(event) {
    var target = event.target;
    SetImage.imageMain.src = target.src;
  }
};