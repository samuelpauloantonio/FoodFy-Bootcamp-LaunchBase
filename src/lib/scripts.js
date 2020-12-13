function redirect(){
    return window.location = '/'
}


// MASCARA PARA MOEDA   


const  Mask  = {
    apply(input, formatAOA){
        setTimeout(function(){
        input.value = Mask.formatAOA(input.value)
        //input.value = Mask[formatAOA](input.value)
        },-1)
    },
    formatAOA(value){
         value = value.replace(/\D/g, "")
        return new Intl.NumberFormat('AOA', {
            style:'currency', 
            currency : 'AKZ'
        }).format(value / 100)
    }


}


/// uploud Image-galery


const PhotosUpload = {

    files : [],
    priview : document.querySelector('.priview-photo'),
    uploudLimit : 5,
    input: "",

    FilesInput (event) {

        
        const {files : fileList} = event.target;

        if(PhotosUpload.hasLimit(event)) return

        //Transform em lista de array os ficheiro ou 
        //photos
        Array.from(fileList).forEach(function(file) {

            // chamar a function Le os Ficheiros
            const reader = new FileReader();

            // enviar cada ficheiro lido dentro array file

            PhotosUpload.files.push(file)

            //Lendo os ficheiros

            reader.onload = function() {
                const image = new Image()
                image.src = String(reader.result)


             const div = PhotosUpload.getContainer(image)
 

                PhotosUpload.priview.appendChild(div)
            }

            reader.readAsDataURL(file)
        
        })
    },

    hasLimit(event){
        const {
            uploudLimit,
            input,
            priview
        } = PhotosUpload

        const { files : fileList} = event.target

        if(fileList.length > uploudLimit){
            alert(`Envie no máximo ${uploudLimit} fotos`)

            event.preventDefault()

            return true
        }

        const photoDiv  = []

        priview.childNodes.forEach((item)=>{

            if(item.classList && item.classList.value == "photo-single"){

                photoDiv.push(item)
            }
        })

        const totalPhotos  = fileList.length + photoDiv.length

        if(totalPhotos > uploudLimit) {
            alert('Você atingiu o limite máximo de  fotos')
            event.preventDefault()

            return true
        }

        return false

    },


    getAllFiles(){
        const dataTransfer = 
        new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach((file)=> dataTransfer.items.add(file))

        return dataTransfer.files
    },


    getContainer(image){
        const div = document.createElement('div')
        div.classList.add("photo-single")

        div.onclick  = PhotosUpload.removePhotos

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },


    getRemoveButton(){
        const button = document.createElement('i')

        button.classList.add('material-icons')

        button.innerHTML = "close"

        return button
    },

    removePhotos(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.priview.children)
        const index = photosArray.indexOf(photoDiv)


        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },

    removeOldPhotos(event){

        const photoSingle = event.target.parentNode

        if(photoSingle){
            const input_hidden = document.querySelector('input[name="removed_files"]')
            
            if(input_hidden){
                input_hidden.value += `${photoSingle.id},`
            }
        }
        photoSingle.remove()
           
        }




   
}


// Banner  Main 


const SetImage = {
    imageMain  : document.querySelector('.image-main > img'),

    bannerMain(event){
        
        const {target} = event
       
        SetImage.imageMain.src = target.src

    
       
    }
}
