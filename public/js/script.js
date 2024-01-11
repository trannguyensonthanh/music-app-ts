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
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if(listButtonFavorite.length > 0){
  listButtonFavorite.forEach(buttonFavorite => {
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

  })
 
}            

// end button like

// search suggest
const boxSearch = document.querySelector(".box-search");
if(boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    console.log(keyword);
    const link = `/search/suggest?keyword=${keyword}`;
  fetch(link)
  .then(res => res.json()) 
  .then(data => {
    if(data.code === 200){
        const songs = data.songs;
    if(songs.length > 0){
      boxSuggest.classList.add("show");
     const htmls =  songs.map(song => {  // sẽ biến thành mảng
        return `
         <a href="/songs/detail/${song.slug}" class="inner-item">
  <div class="inner-image">
    <img src="${song.avatar}" alt="Song Image">
  </div>
  <div class="inner-info">
    <div class="inner-title">${song.title}</div>
    <div class="inner-singer">
      <i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}
    </div>
  </div>
</a>
        `
       });
        const boxList = boxSuggest.querySelector(".inner-list");
        boxList.innerHTML = htmls.join("");
    } else {
      boxSuggest.classList.remove("show");
    }
    }
  
  })
  })
}
// search suggest