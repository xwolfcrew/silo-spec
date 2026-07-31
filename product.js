document.addEventListener("DOMContentLoaded", () => {
  const initPageLoad = () => {
    const tl = gsap.timeline();

    gsap.set(".product-container", { x: "-100%", opacity: 0 });
    gsap.set(".product-alt", { x: "100%", opacity: 0 });
    gsap.set(".nav-left, .nav-right a span", { y: "100%", opacity: 0 });

    tl.to(".nav-left, .nav-right a span", {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
    })

      .to(
        ".product-container",
        {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.4",
      )

      .to(
        ".product-alt",
        {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.8",
      );
  };

  initPageLoad();

  const products = document.querySelectorAll(".product");
  const bgWrapper = document.querySelector(".bg-image");
  const altTitle = document.querySelector(".product-alt h1");
  const altPrice = document.querySelector(".product-alt p");

  let isAnimating = false;

  products.forEach((product) => {
    product.addEventListener("click", () => {
      if (isAnimating || product.classList.contains("active")) return;
      isAnimating = true;

      products.forEach((p) => p.classList.remove("active"));
      product.classList.add("active");

      const newBgSrc = product.dataset.bg;
      const newName = product.dataset.name;
      const newPrice = product.dataset.price;

      const currentBgImg = bgWrapper.querySelector("img:last-child");
      const nextBgImg = document.createElement("img");
      nextBgImg.src = newBgSrc;

      gsap.set(nextBgImg, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        x: "100%",
      });

      bgWrapper.appendChild(nextBgImg);

      const switchTl = gsap.timeline({
        onComplete: () => {
          if (currentBgImg) currentBgImg.remove();
          isAnimating = false;
        },
      });

      switchTl
        .to(currentBgImg, {
          x: "-30%",
          duration: 0.9,
          ease: "power3.inOut",
        })
        .to(
          nextBgImg,
          {
            x: "0%",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "<",
        );

      switchTl
        .to(
          [altTitle, altPrice],
          {
            y: -20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.15,
            ease: "power2.in",
            onComplete: () => {
              altTitle.textContent = newName;
              altPrice.textContet = newPrice;
            },
          },
          "<",
        )

        .to([altTitle, altPrice], {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.15,
          ease: "power2.out",
        });
    });
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
});
