const result = document.getElementById("result");
document.getElementById("btn-input-submit").addEventListener("click", () => {
    const inputValue = document.getElementById("user-input").value;

    if (inputValue == undefined || inputValue == "") {
        alert("You have give a song name");
    } else {
        fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                const dataValue = data.data;
                // console.log(dataValue.lyrics);
                if (dataValue.length == 0) {
                    alert("You have to give correct song name");
                } else {
                    for (let i = 0; i < dataValue.length; i++) {
                        const song = dataValue[i];
                        // const title = song.title;
                        // const artist = song.artist.name;
                        const div = document.createElement("div");

                        div.innerHTML = `
                        <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <h4 class="lyrics-name">Singer: ${song.artist.name}</h4> 
                            <p class="author lead">
                                Album by <span>${song.album.title}</span>
                            </p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyrics('${song.artist.name}',' ${song.title}')" class="btn btn-success" ">Get Lyrics</button>
                        </div>
                    </div>`;

                        if (i < 10) {
                            result.appendChild(div);
                        }
                    }
                }
            });
    }
    document.getElementById("user-input").value = "";
    result.innerHTML = "";
});
function getLyrics(artist, title) {
    // console.log(artist, title);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

            result.innerHTML = `<div style = "text-align : center">
        <h1 style="color : #28A745">${artist} - ${title}</h1>
        <div>${lyrics}</div>
        </div>`;
        });
}
