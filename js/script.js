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

    $.ajax({
      url: "json/team.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        const teamMembers = $("#slider");
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
      },
      error: function () {
        console.error("Помилка при завантаженні команди.");
      },
    });
})();
