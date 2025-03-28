(function () {
  $.ajax({
    url: "json/cases.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const caseList = $(".case-list");
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

  $.ajax({
    url: "json/team.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      const teamMembers = $(".team-members");
      data.forEach(function (member) {
        const memberItem = $("<div>").addClass("member-item");
        $("<img>").attr("src", member.image).appendTo(memberItem);
        $("<h4>").text(member.name).appendTo(memberItem);
        $("<p>").text(member.position).appendTo(memberItem);
        teamMembers.append(memberItem);
      });
    },
    error: function () {
      console.error("Помилка при завантаженні команди.");
    },
  });
})();
