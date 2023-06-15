 const uploadButton = document.getElementById('upload-button');
    const hiddenUpload = document.getElementById('hidden-upload');
    const imageContainer = document.getElementById('image-container');

    const defaultImageUrl = 'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png'; // Replace with your default image URL

    hiddenUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const modifiedDataUrl = readerEvent.target.result;
          imageContainer.src = modifiedDataUrl;
        };
        reader.readAsDataURL(file);
      }
    });


    // Additional code for alternate image
    const alternateImageUpload = document.createElement('input');
    alternateImageUpload.type = 'file';
    alternateImageUpload.id = 'alternate-upload';
    alternateImageUpload.className = 'hidden';

    alternateImageUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const alternateDataUrl = readerEvent.target.result;
          uploadImage(file);
        };
        reader.readAsDataURL(file);
      }
    });
    function uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          imageContainer.src = imageUrl;
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
    hiddenUpload.parentNode.replaceChild(alternateImageUpload, hiddenUpload);

    // Set default image when no image is uploaded
    imageContainer.src = defaultImageUrl;