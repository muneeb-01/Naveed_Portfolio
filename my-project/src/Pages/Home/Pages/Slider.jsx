import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "Lenis";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { title: "Desert Oasis Pool", image: "/images/1b.jpg", url: "/" },
  { title: "Domed Sanctuart", image: "/images/6a.jpg", url: "/" },
  { title: "Desert Oasis Pool", image: "/images/4b.jpg", url: "/" },
  { title: "Domed Sanctuart", image: "/images/8a.jpg", url: "/" },
  { title: "Desert Oasis Pool", image: "/images/8b.jpg", url: "/" },
  { title: "Desert Oasis Pool", image: "/images/1b.jpg", url: "/" },
];

const Slider = () => {
  useEffect(() => {
    const LenisInstance = new Lenis();
    LenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      LenisInstance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const slideImages = document.querySelector(".slide-images");
    const titleElement = document.getElementById("title-text");
    const exploreLink = document.querySelector(".slide-link a");

    const totalSlides = slides.length;
    const stripCount = 25;
    let currentTitleIndex = 0;
    let queuedTitleIndex = null;
    const titleChangeThreeshold = 0.5;
    let isAnimating = false;

    const firstSlideImage = document.querySelector("#img-1 img");
    firstSlideImage.style.transform = "scale(1.25)";

    for (let i = 1; i < totalSlides; i++) {
      const imgContainer = document.createElement("div");
      imgContainer.className = "img-container";
      imgContainer.id = `img-container-${i + 1}`;
      imgContainer.style.opacity = 0;

      for (let j = 0; j < stripCount; j++) {
        const strip = document.createElement("div");
        strip.className = "strip";

        const img = document.createElement("img");
        img.className = "animating-images";
        img.src = slides[i].image;
        img.alt = slides[i].title;
        img.style.transform = "scale(1.25)";

        const stripPositionFromBottom = stripCount - j - 1;
        const stripLowerBound =
          (stripPositionFromBottom + 1) * (100 / stripCount);
        const stripUpperBound = stripPositionFromBottom * (100 / stripCount);

        strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%,100% ${
          stripUpperBound - 0.1
        }%,0% ${stripUpperBound - 0.1}%)`;
        strip.appendChild(img);
        imgContainer.appendChild(strip);
      }
      slideImages.appendChild(imgContainer);
    }

    const transitionCount = totalSlides - 1;
    const scrollDistancePerTransition = 1000;
    const initailScrollDelay = 300;
    const finalScrollDelay = 300;

    const totalScrollDistance =
      transitionCount * scrollDistancePerTransition +
      initailScrollDelay +
      finalScrollDelay;

    const transitionRanges = [];
    let currentScrollPosition = initailScrollDelay;

    for (let i = 0; i < transitionCount; i++) {
      const transitionStart = currentScrollPosition;
      const transitionEnd = transitionStart + scrollDistancePerTransition;

      transitionRanges.push({
        transition: i,
        startVh: transitionStart,
        endVh: transitionEnd,
        startPercent: transitionStart / totalScrollDistance,
        endPercent: transitionEnd / totalScrollDistance,
      });

      currentScrollPosition = transitionEnd;
    }

    function calculateImageProgress(scrollProgress) {
      let imageProgress = 0;
      if (scrollProgress < transitionRanges[0].startPercent) return 0;
      if (
        scrollProgress >
        transitionRanges[transitionRanges.length - 1].endPercent
      )
        return transitionRanges.length;

      for (let i = 0; i < transitionRanges.length; i++) {
        const range = transitionRanges[i];
        if (
          scrollProgress >= range.startPercent &&
          scrollProgress <= range.endPercent
        ) {
          const rangeSize = range.endPercent - range.startPercent;
          const normalizedProgress =
            (scrollProgress - range.startPercent) / rangeSize;
          imageProgress = i + normalizedProgress;
          break;
        } else if (scrollProgress > range.endPercent) {
          imageProgress = i + 1;
        }
      }
      return imageProgress;
    }
    function getScaleForImage(imageIndex, currentImageIndex, progress) {
      if (imageIndex > currentImageIndex) return 1.25;
      if (imageIndex < currentImageIndex - 1) return 1;

      let totalProgress =
        imageIndex === currentImageIndex ? progress : 1 + progress;
      return 1.25 - (0.25 * totalProgress) / 2;
    }
    function animateTitleChange(index, direction) {
      if (index === currentTitleIndex) return;
      if (index < 0 || index >= slides.length) return;
      if (isAnimating) {
        queuedTitleIndex = index;
        return;
      }
      isAnimating = true;
      const newTitle = slides[index].title;
      const newUrl = slides[index].url;
      const outY = direction === "down" ? "-120%" : "120%";
      const inY = direction === "down" ? "120%" : "-120%";

      gsap.killTweensOf(titleElement);
      exploreLink.href = newUrl;

      gsap.to(titleElement, {
        y: outY,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          titleElement.textContent = newTitle;
          gsap.set(titleElement, { y: inY });
          gsap.to(titleElement, {
            y: "0%",
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              currentTitleIndex = index;
              isAnimating = false;

              if (
                queuedTitleIndex !== null &&
                queuedTitleIndex !== currentTitleIndex
              ) {
                const nextIndex = queuedTitleIndex;
                queuedTitleIndex = null;
                animateTitleChange(nextIndex, direction);
              }
            },
          });
        },
      });
    }
    function getTitleINdexForProgress(imageProgress) {
      const imageIndex = Math.floor(imageProgress);
      const imageSpecificProgress = imageProgress - imageIndex;

      if (imageSpecificProgress >= titleChangeThreeshold)
        return Math.min(imageIndex + 1, slides.length - 1);
      else {
        return imageIndex;
      }
    }
    let lastImageProgress = 0;

    ScrollTrigger.create({
      trigger: ".sticky-slider",
      start: "top top",
      end: `+=${totalScrollDistance}vh`,
      scrub: 1,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const imageProgress = calculateImageProgress(self.progress);

        if (typeof imageProgress === "number") {
          const scrollDirection =
            imageProgress > lastImageProgress ? "down" : "up";
          const currentImageIndex = Math.floor(imageProgress);
          const imageSpecificProgress = imageProgress - currentImageIndex;

          const correctTitleIndex = getTitleINdexForProgress(imageProgress);
          if (currentTitleIndex !== correctTitleIndex) {
            queuedTitleIndex = correctTitleIndex;
            if (!isAnimating) {
              animateTitleChange(correctTitleIndex, scrollDirection);
            }
          }
          const firstSlideImgScale = getScaleForImage(
            0,
            currentImageIndex,
            imageSpecificProgress
          );
          firstSlideImage.style.transform = `scale(${firstSlideImgScale})`;

          for (let i = 1; i < totalSlides; i++) {
            const imageIndex = i + 1;
            const transitionIndex = imageIndex - 2;
            const imgContainer = document.getElementById(
              `img-container-${imageIndex}`
            );
            if (!imgContainer) continue;
            imgContainer.style.opacity = 1;

            const strips = imgContainer.querySelectorAll(".strip");
            const images = imgContainer.querySelectorAll("img");

            if (transitionIndex < currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripCount - stripIndex - 1;
                const stripUpperBound =
                  stripPositionFromBottom * (100 / stripCount);
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripCount);
                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${
                  stripUpperBound - 0.1
                }%, 0% ${stripUpperBound - 0.1}%)`;
              });
            } else if (transitionIndex === currentImageIndex) {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripCount - stripIndex - 1;
                const stripUpperBound =
                  stripPositionFromBottom * (100 / stripCount);
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripCount);
                const stripDelay = (stripIndex / stripCount) * 0.5;
                const adjstedProgress = Math.max(
                  0,
                  Math.min(1, (imageSpecificProgress - stripDelay) * 2)
                );
                const currentStripUpperBound =
                  stripLowerBound -
                  (stripLowerBound - (stripUpperBound - 0.1)) * adjstedProgress;

                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%,100% ${
                  currentStripUpperBound - 0.1
                }%,0% ${currentStripUpperBound - 0.1}%)`;
              });
            } else {
              strips.forEach((strip, stripIndex) => {
                const stripPositionFromBottom = stripCount - stripIndex - 1;
                const stripLowerBound =
                  (stripPositionFromBottom + 1) * (100 / stripCount);
                strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripLowerBound}%, 0% ${
                  stripLowerBound + 0.1
                }%)`;
              });
            }
            const imgScale = getScaleForImage(
              transitionIndex,
              currentImageIndex,
              imageSpecificProgress
            );
            images.forEach((img) => {
              img.style.transform = `scale(${imgScale})`;
            });
          }
          lastImageProgress = imageProgress;
        }
      },
    });

    return () => {
      gsap.ticker.remove((time) => {
        console.log(time);
      });
      // Optional: destroy Lenis if needed
      LenisInstance.destroy?.();
    };
  }, []);

  return (
    <>
      <div className="h-[550vh] relative text-xl font-NeueMachina font-bold">
        <section className="sticky-slider sticky top-0 left-0 section-image-slides">
          <div className="slide-images">
            <div className="img" id="img-1">
              <img className="slide-image" src="/images/6a.jpg" alt="" />
            </div>
          </div>

          <div className="slide-info shadow-md">
            <div className="slide-title-prefix">
              <p>Essence</p>
            </div>
            <div className="slide-title">
              <p id="title-text">Desert Oasis Pool</p>
            </div>
            <div className="slide-link">
              <Link to={"/home"}>Explore #8599</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Slider;
