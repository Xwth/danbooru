(function() {
  Danbooru.ModQueue = {};

  Danbooru.ModQueue.initialize_approve_all_button = function() {
    $("#approve-all-button").click(function(e) {
      if (!confirm("Are you sure you want to approve every post on this page?")) {
        return;
      }

      $(".approve-link").trigger("click");
      e.preventDefault();
    });
  }

  Danbooru.ModQueue.initialize_hide_all_button = function() {
    $("#hide-all-button").click(function(e) {
      if (!confirm("Are you sure you want to hide every post on this page?")) {
        return;
      }

      $(".disapprove-link").trigger("click");
      e.preventDefault();
    });
  }

  Danbooru.ModQueue.initialize_hilights = function() {
    $.each($("div.post"), function(i, v) {
      var $post = $(v);
      var score = parseInt($post.data("score"));
      if (score >= 3) {
        $post.addClass("post-pos-score");
      }
      if (score <= -3) {
        $post.addClass("post-neg-score");
      }
      if ($post.data("has-children")) {
        $post.addClass("post-has-children");
      }
      if ($post.data("has-dup")) {
        $post.addClass("post-has-dup");
      }
    });
  }

  Danbooru.ModQueue.initialize_detailed_rejection_links = function() {
    $(".detailed-rejection-link").click(Danbooru.ModQueue.detailed_rejection_dialog)
  }

  Danbooru.ModQueue.detailed_rejection_dialog = function() {
    $("#post_id").val($(this).data("post-id"));

    $("#detailed-rejection-dialog").dialog({
      width: 500,
      buttons: {
        "Submit": function() {
          var data = $("#detailed-rejection-form").serialize();
          $.ajax({
            type: "POST",
            url: $("#detailed-rejection-form").attr("action"),
            data: data,
            dataType: "script"
          });
          $("#detailed-rejection-dialog").dialog("close");
        },
        "Cancel": function() {
          $("#detailed-rejection-dialog").dialog("close");
        }
      }
    });

    return false;
  }
})();

$(function() {
  if ($("#c-moderator-post-queues").length) {
    Danbooru.ModQueue.initialize_approve_all_button();
    Danbooru.ModQueue.initialize_hide_all_button();
    Danbooru.ModQueue.initialize_hilights();
    Danbooru.ModQueue.initialize_detailed_rejection_links();
  }

  if ($("#c-posts #a-show").length) {
    Danbooru.ModQueue.initialize_detailed_rejection_links();
  }
});
