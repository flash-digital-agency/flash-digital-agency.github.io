(function () {
  $.ajax({
    url: "json/cases.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const caseList = $("#case-list");
      data.forEach(function (item) {
        const caseItem = $("<div>").addClass("case-item");
        $("<h3>").text(item.title).appendTo(caseItem);
        $("<p>").text(item.description).appendTo(caseItem);
        caseList.append(caseItem);
      });
    },
    error: function () {
      console.error("Помилка при завантаженні кейсов.");
    },
  });

  let mobileScreen = false;

  updateTeam();
  setInterval(() => {
    if (mobileScreen && screen.width > 767 || !mobileScreen && screen.width < 768) updateTeam();
  }, 1000);

  function updateTeam() {
    $.ajax({
      url: "json/team.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (screen.width > 767) {
          const teamMembers = $("#team-members");
          if (mobileScreen) mobileScreen = false;
          $(".slider-container").css("display", "none");
          teamMembers.html("").css("display", "grid");
          data.forEach(function (member) {
            const memberItem = $("<div>").addClass("member-item");
            $("<img>").attr("src", member.image).appendTo(memberItem);
            $("<h4>").text(member.name).appendTo(memberItem);
            $("<p>").text(member.position).appendTo(memberItem);
            teamMembers.append(memberItem);
          });
        } else {
          const teamMembers = $("#slider");
          if (!mobileScreen) mobileScreen = true;
          $("#team-members").css("display", "none");
          teamMembers.html("");
          $(".slider-container").css("display", "block");
          let firstPhoto = true;
          data.forEach(function (member) {
            const memberItem = $("<div>").addClass("slide");
            if (firstPhoto) {
              memberItem.addClass("active");
              firstPhoto = false;
            }
            $("<img>").attr("src", member.image).appendTo(memberItem);
            teamMembers.append(memberItem);
            const description = $("<div>").addClass("description");
            $("<h3>").text(member.name).appendTo(description);
            $("<p>").text(member.position).appendTo(description);
            memberItem.append(description);
            teamMembers.append(memberItem);
          });

          const slides = document.querySelectorAll(".slide");
          const prevButton = document.querySelector(".prev");
          const nextButton = document.querySelector(".next");
          let currentSlide = 0;

          prevButton.addEventListener("click", function () {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
          });

          nextButton.addEventListener("click", function () {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
          });
        }
      },
      error: function () {
        console.error("Помилка при завантаженні команди.");
      },
    });
  }
})();
