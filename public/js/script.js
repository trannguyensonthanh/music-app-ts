const aplayer = document.querySelector("#aplayer");
if(aplayer){
  let dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  let dataSinger = JSON.parse(aplayer.getAttribute("data-singer"))
  const ap = new APlayer({
  container: aplayer,
  audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover:  dataSong.avatar
  }],
  autoplay: true
});
const avatar = document.querySelector(".singer-detail .inner-avatar");
ap.on('play', function(){
avatar.style.animationPlayState = "running";
});
ap.on('pause', function(){
avatar.style.animationPlayState = "paused";
});
}

//button like
const buttonLike = document.querySelector("[button-like");
if(buttonLike){
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active"); // ( true or false );
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;
      const option = {
        method: "PATCH"
      }

    fetch(link, option)
    .then(res => res.json())
    .then(data => {
      const span = buttonLike.querySelector("span");
      span.innerHTML = `${data.newLike} thích` 
      if(isActive){
  
        buttonLike.classList.toggle("active");
      }
      else {
        buttonLike.classList.add("active");
      }
    })
  })

}            

// end button like

//button like
const buttonFavorite = document.querySelector("[button-favorite]");
if(buttonFavorite){
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active"); // ( true or false );
    const typeFavorite = isActive ? "unfavorite" : "favorite";
    const link = `/songs/favorite/${typeFavorite}/${idSong}`;
      const option = {
        method: "PATCH"
      }

    fetch(link, option)
    .then(res => res.json()) 
    .then(data => {
     if(data.code == 200){
      buttonFavorite.classList.toggle("active");
     }
    })
  })

}            

// end button like
