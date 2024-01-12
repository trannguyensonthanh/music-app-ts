// Upload image
const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  
 uploadImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadImagePreview.src = URL.createObjectURL(file);
  }
  
 });
}
//end upload image

//upload file âm thanh
const uploadAudio = document.querySelector("[upload-audio]");

if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("[upload-audio-preview]");

  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra xem file có phải là file âm thanh hay không
      if (file.type.startsWith('audio/')) {
        const audioUrl = URL.createObjectURL(file);
        source.src = audioUrl;
        uploadAudioPlay.load(); 
      } else {
        alert('Vui lòng chọn một file âm thanh.');
        uploadAudioInput.value = ''; // Xóa giá trị của input nếu file không phải là âm thanh
      }
    }
  });
}
//end upload file âm thanh