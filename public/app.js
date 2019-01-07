// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page

    console.log(data[i])

    var card = $("<div>");
    card.addClass("card");
    card.attr("id", data[i]._id);

    var row = $("<div>");
    row.addClass("row")

    var image = $("<div>");
    image.addClass("col-md-3");
    image.append("<img src='" + data[i].img + "' >");

    var text = $("<div>");
    text.addClass("col-md-9");
    text.append("<h5>" + data[i].title + "</h5>");
    text.append("<p> <a href='#' class='btn btn-primary' style='float: right; margin-right: 15px;' data-id='" + data[i]._id + "' id='addModal'>Add Note</a><a href='#' class='btn btn-primary' style='float: right; margin-right: 15px;' data-url='https://www.cnbc.com" + data[i].link + "' id='readNew'>Read More</a> </p>");

    var note = $("<div>");

    if(data[i].note){ 
      note.append("<p>Note:</p>");       
      note.append("<p>" + data[i].note + "</p>")
    }

    text.append(note);

    row.append(image).append(text);
    card.append(row);
    $("#dataNews").append(card);
  }

});



$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function (event) {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (data) {
      setTimeout(() => {
        $.getJSON("/articles", function (data) {
          $("#dataNews").text('');
          for (var i = 0; i < data.length; i++) { 
        
            var card = $("<div>");
            card.addClass("card");
            card.attr("id", data[i]._id);
        
            var row = $("<div>");
            row.addClass("row")
        
            var image = $("<div>");
            image.addClass("col-md-3");
            image.append("<img src='" + data[i].img + "' >");
        
            var text = $("<div>");
            text.addClass("col-md-9");
            text.append("<h5>" + data[i].title + "</h5>");
            text.append("<p> <a href='#' class='btn btn-primary' style='float: right; margin-right: 15px;' data-id='" + data[i]._id + "' id='addModal'>Add Note</a><a href='#' class='btn btn-primary' style='float: right; margin-right: 15px;' data-url='https://www.cnbc.com" + data[i].link + "' id='readNew'>Read More</a> </p>");
        
            var note = $("<div>");
        
            if(data[i].note){   
              note.append("<p>Note:</p>");  
              note.append("<p>" + data[i].note + "</p>")
            }
        
            text.append(note);
        
            row.append(image).append(text);
            card.append(row);
            $("#dataNews").append(card);
          }
        });
      }, 1000)

    });
});

$(document).on("click", "#readNew", function (event) {
  let url = $(this).attr('data-url');
  window.open(url, '_blank');
});


let newId = '';
$(document).on("click", "#addModal", function (event) {
  newId = $(this).attr('data-id')
  $('#noteModal').modal('toggle');
});

$(document).on("click", "#saveNote", function (event) {
  $.ajax({
    method: "POST",
    url: "/articles/" + newId,
    data: {
      body: $("#noteToAdd").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#noteToAdd").val("");
      $('#noteModal').modal('hide');
    });
});

