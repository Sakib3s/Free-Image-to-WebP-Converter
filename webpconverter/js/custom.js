let imageInput = document.getElementById('image-input');
    let previewContainer = document.getElementById('preview-container');
    let convertButton = document.getElementById('convert-button');
    let downloadButton = document.getElementById('download-button');

    imageInput.addEventListener('change', () => {
      previewContainer.innerHTML = '';
      for (let i = 0; i < imageInput.files.length; i++) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(imageInput.files[i]);
        img.setAttribute('data-name', imageInput.files[i].name);
        let previewItem = document.createElement('div');
        previewItem.classList.add('preview-item');
        previewItem.appendChild(img);
        previewContainer.appendChild(previewItem);
      }
    });

    function convertImageToWebP() {
        // Hide the Download All WebP button
        downloadButton.style.display = 'none';
      
        // Create a new instance of JSZip
        let zip = new JSZip();
      
        // Convert the images to WebP format
        for (let i = 0; i < previewContainer.children.length; i++) {
          let imgElement = previewContainer.children[i].querySelector('img');
          if (imgElement) {
            let imgName = imgElement.getAttribute('data-name');
            let imgExtension = imgName.substr(imgName.lastIndexOf('.') + 1);
            let imgNameWithoutExt = imgName.substr(0, imgName.lastIndexOf('.'));
            let canvas = document.createElement('canvas');
            canvas.width = imgElement.naturalWidth;
            canvas.height = imgElement.naturalHeight;
            canvas.getContext('2d').drawImage(imgElement, 0, 0);
            canvas.toBlob((blob) => {
              zip.file(`${imgNameWithoutExt}.webp`, blob);
              if (i === previewContainer.children.length - 1) {
                // All images have been converted, so create the zip file
                zip.generateAsync({type: 'blob'}).then((blob) => {
                  saveAs(blob, 'images.zip');
                });
                // Show the Download All WebP button
                downloadButton.style.display = 'block';
              }
            }, 'image/webp');
          }
        }
      }
      

    convertButton.addEventListener('click', convertImageToWebP);