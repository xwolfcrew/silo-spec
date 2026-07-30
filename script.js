gsap.registerPlugin(ScrollTrigger);

const dynamicImagePaths = [
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./assets/img4.jpg",
  "./assets/img5.jpg",
  "./assets/img6.jpg",
];

const galleryContainer = document.querySelector(".section-1-gallery");

dynamicImagePaths.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = `Dynamic Gallery Image ${index + 1}`;
  img.classList.add("dynamic-gallery-img");

  galleryContainer.appendChild(img);
});

const dynamicImages = galleryContainer.querySelectorAll(".dynamic-gallery-img");

gsap.set(dynamicImages, {
  yPercent: 100,
});

function lockScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.pointerEvents = "none";
}

function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.pointerEvents = "";
}

lockScroll();

const navLogo = new SplitType(".nav-left", { types: "chars, words" });
const navLinks = new SplitType(".nav-right a", { types: "chars, words" });

const allNavChars = [...navLogo.chars, ...navLinks.chars];

const loadTL = gsap.timeline({
  onComplete: () => {
    (unlockScroll(), initScrollGallery());
  },
});

gsap.set(".background-image img", {
  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
});
gsap.set(allNavChars, { opacity: 0, y: 20 });
gsap.set(
  [".section-1-content h1", ".section-1-content p", ".section-1-gallery"],
  {
    opacity: 0,
    y: 40,
  },
);

loadTL

  .to(".background-image img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power4.inOut",
  })

  .to(
    allNavChars,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "power3.out",
    },
    "-=0.8",
  )

  .to(
    [".section-1-content h1", ".section-1-content p", ".section-1-gallery"],
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.6",
  );

function initScrollGallery() {
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-1",
      start: "top top",
      endTrigger: ".section-2",
      end: "top 20%",
      scrub: 1,
      pin: false,
      anticipatePin: 1,
    },
  });

  dynamicImages.forEach((img) => {
    scrollTL.to(img, {
      yPercent: 0,
      ease: "power1.out",
      duration: 1,
    });
  });
}

ScrollTrigger.create({
  trigger: ".section-2",
  start: "top 10%",
  end: "bottom 20%",
  toggleClass: {
    targets: "nav",
    className: "nav-dark-text",
  },
});

const navLinksRoll = document.querySelectorAll(".nav-right .nav-link");

navLinksRoll.forEach((link) => {
  const textSpan = link.querySelector("span");

  const rollTL = gsap.timeline({ paused: true });

  rollTL

    .to(textSpan, {
      yPercent: -100,
      duration: 0.2,
      ease: "power3.inOut",
    })

    .set(textSpan, {
      yPercent: 100,
    })

    .to(textSpan, {
      yPercent: 0,
      duration: 0.2,
      ease: "power2.out",
    });

  link.addEventListener("mouseenter", () => {
    rollTL.restart();
  });

  link.addEventListener("mouseleave", () => {
    rollTL.restart();
  });
});

const section2 = document.querySelector(".section-2");
const section2Text = document.querySelector(".section-2 h2");

const section2TL = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-2",
    start: "top 50%",
    end: "top 10%",
    scrub: 1.5,
  },
});

gsap.set(section2Text, {
  opacity: 0,
  yPercent: 40,
})

section2TL

.to(section2Text, {
  opacity: 1,
  yPercent: 0,
  ease: "power2.out",
})

const path = document.querySelector(".section-3-wrapper svg path.e");
const endPoint = document.querySelector(".section-3-wrapper svg path.d");
const italyText = document.querySelector(".section-3-bg-copy");

const imageOverlay = document.querySelector(".image-overlay img");

if (path && endPoint) {
  const pathLength = path.getTotalLength();

  gsap.set(italyText, {
    opacity: "0",
    xPercent: -150,
  });

  gsap.set(imageOverlay, {
    yPercent: 20,
    opacity: 0,
  });

  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  gsap.set(endPoint, {
    scale: 0,
    opacity: 0,
    rotation: 45,
    svgOrigin: "615.5 1285.5",
  });

  const section3TL = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-3",
      start: "top 50%",
      end: "top 20%",
      scrub: 1.5,
    },
  });

  section3TL

    .to(
      imageOverlay,
      {
        yPercent: 0,
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
      },
      "-=0.2",
    )

    .to(
      path,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      "-=0.5",
    )

    .to(
      endPoint,
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power1.out",
      },
      "-=0.2",
    )

    .to(
      italyText,
      {
        opacity: "1",
        xPercent: -50,
        duration: 1,
      },
      "-=0.4",
    );
}
