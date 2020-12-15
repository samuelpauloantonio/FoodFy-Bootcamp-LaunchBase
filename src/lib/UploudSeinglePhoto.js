


const PhotosUploadUsers = {

    files : [],
    priview : document.querySelector(".priview-photo-users"),
    uploudLimit : 1,
    input: "",

    FilesInputUser(event) {

        
        const {files : fileList} = event.target;



        //Transform em lista de array os ficheiro ou 
        //photos
        Array.from(fileList).forEach(function(file) {

            // chamar a function Le os Ficheiros
            const reader = new FileReader();

            // enviar cada ficheiro lido dentro array file

            PhotosUploadUsers.files.push(file)

            for(let tamanho = 1; tamanho < fileList.length; fileList.slice - 1){
                return 
            }

            console.log(fileList)
           
            //Lendo os ficheiros

            reader.onload = function() {
                const image = new Image()
                image.src = String(reader.result)


             const div = PhotosUploadUsers.getContainer(image)
 

                PhotosUploadUsers.priview.appendChild(div)
            }

            reader.readAsDataURL(file)


           

          
        
        })
    },

    


    getAllFiles(){
        const dataTransfer = 
        new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUploadUsers.files.forEach((file)=> dataTransfer.items.add(file))

        return dataTransfer.files
    },


    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('avatar-single')

        // div.onclick  = PhotosUploadUsers.removePhotos

        div.appendChild(image)

    

        return div
    },


    // getRemoveButton(){
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




   
}