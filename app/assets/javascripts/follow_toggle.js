$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;

  this.bindEvents();
  this.render();
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed") {
    this.$el.prop("disabled", false);
    this.$el.html("Follow!");
  } else if (this.followState === "followed") {
    this.$el.prop("disabled", false);
    this.$el.html("Unfollow!");
  } else if (this.followState === "following") {
    this.$el.prop("disabled", true);
  }
};

$.FollowToggle.prototype.bindEvents = function () {
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  var initialState = this.followState;
  this.followState = "following";
  this.render();

  var path = "/users/" + this.userId + "/follow";
  var method = "POST";
  if (initialState === "followed") {
    method = "DELETE";
  }

  $.ajax({
    url: path,
    type: method,
    dataType: "json",
    success: function () {
      if (initialState === "unfollowed") {
        this.followState = "followed";
      } else if (initialState === "followed") {
        this.followState = "unfollowed";
      }

      this.render();
    }.bind(this),

  })
};


$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
