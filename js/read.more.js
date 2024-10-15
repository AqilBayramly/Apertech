 // Read more function
 function showMore(event) {
    var target = event.target;
    var textContainer = target.parentElement.querySelector(".clients__text");
    var dots = textContainer.querySelector(".dots");
    var moreText = textContainer.querySelector(".more__text");

    dots.style.display = "none";
    moreText.style.display = "inline";
    target.innerHTML = "Read less";
  }

  // Read less function
  function showLess(event) {
    var target = event.target;
    var textContainer = target.parentElement.querySelector(".clients__text");
    var dots = textContainer.querySelector(".dots");
    var moreText = textContainer.querySelector(".more__text");

    dots.style.display = "inline";
    moreText.style.display = "none";
    target.innerHTML = "Read more";
  }

  // Event listener for the buttons
  var readMoreBtns = document.querySelectorAll(".read__more__btn");
  readMoreBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      if (event.target.innerHTML === "Read more") {
        showMore(event);
      } else {
        showLess(event);
      }
    });
  });