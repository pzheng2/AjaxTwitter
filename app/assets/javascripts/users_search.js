$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $(this.$el.find("input"));
  this.$userList = $(this.$el.find("ul"));
  this.bindEvents();
};

$.UsersSearch.prototype.bindEvents = function () {
  this.$input.on("input", this.handleInput.bind(this))
};

$.UsersSearch.prototype.handleInput = function (event) {
  event.preventDefault();
  var inString = event.currentTarget.value;
  var path = "/users/search";
  var verb = "GET";

  $.ajax({
    url: path,
    type: verb,
    dataType: "json",
    data: {query: inString},
    success: function (data) {
      this.renderResults(data);
    }.bind(this)
  });
};

$.UsersSearch.prototype.renderResults = function (data) {
  this.$userList.empty();
  // debugger;
  for (var i = 0; i < data.length; i++) {
    var path = "/users/" + data[i].id
    var html = "<li><a href='" + path + "'>" + data[i].username + "</a></li>";
    this.$userList.append(html);
  }
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this)
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
