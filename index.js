const glide = new Glide(".glide");
const captionsEL = document.querySelector(".slide-caption");

glide.on("mount.after", "run.after"),() =>{
    const caption = captionsEL[glide.index];
    anime({
        targets: caption.childern,
        opacity: [0,1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {start: 300}),

    })
}

glide.mount();