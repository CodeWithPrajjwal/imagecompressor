let input = document.getElementById("input")

let WIDTHDownload = 300
let WIDTHUpload = 300

let WIDTHDownload1 = 900

input.addEventListener("change", (event) => {

    let image_file = event.target.files[0]
    console.log(image_file)

    let reader = new FileReader

    reader.readAsDataURL(image_file)
    console.log(reader)

    reader.onload = (event) => {

        let image_url = event.target.result
        let image = document.createElement("img")
        image.src = image_url

        let imageUpload = document.createElement("img")

        image.onload = (newevent) => {


            let canvasDownload = document.createElement("canvas")
            let aspectRatio = WIDTHDownload / newevent.target.width
            canvasDownload.width = WIDTHDownload
            canvasDownload.height = newevent.target.height * aspectRatio

            let canvasDownload1 = document.createElement("canvas")
            canvasDownload1.width = newevent.target.width
            canvasDownload1.height = newevent.target.height

            let canvasUpload = document.createElement("canvas")
            let aspectRatioUp = WIDTHUpload / newevent.target.width
            canvasUpload.width =  WIDTHUpload
            canvasUpload.height = newevent.target.height * aspectRatioUp

            const contextUp = canvasUpload.getContext("2d")
            contextUp.drawImage(image, 0, 0, canvasUpload.width, canvasUpload.height)

            const contextdown1 = canvasDownload1.getContext("2d")
            contextdown1.drawImage(image, 0, 0, canvasDownload1.width, canvasDownload1.height)

            const contextdown = canvasDownload.getContext("2d")
            contextdown.drawImage(image, 0, 0, canvasDownload.width, canvasDownload.height)

            let newImage_url = contextdown.canvas.toDataURL("image/jpeg", 100)
            let newImage1_url = contextdown1.canvas.toDataURL("image/jpeg", 0.5)

            let imageUpload_url = contextUp.canvas.toDataURL("image/jpeg",100)


            let newImage = document.createElement("img")
            newImage.src = newImage_url

            imageUpload.src = imageUpload_url


        document.getElementById("wrapper_download").appendChild(newImage)
        document.getElementById("wrapper_upload").appendChild(imageUpload)

        let label = document.querySelector(".label");
        label.innerHTML = "Your Image Will Be Downloaded";
        label.style.color = 'crimson';

        document.getElementById("wrapper_upload").removeChild(input);

        let classimage = document.querySelector(".image");
        classimage.innerHTML = "Compress Another";
        classimage.style.color = 'white';

        download(newImage1_url);

        }
    }

function download(downloadUrl){
    axios({
        url: downloadUrl,
        method:'GET',
        responseType: 'blob'
})
.then((response) => {
       const url = window.URL
       .createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'compressed_image.jpg');
              document.body.appendChild(link);
              link.click();
})
}
})
