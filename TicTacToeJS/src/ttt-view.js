class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $("ul").on("click", "li", event =>{
      const $li = $(event.currentTarget);
      this.makeMove($li);
    });
  }

  makeMove($square) {
    if (!$square.hasClass("clicked") && !this.game.isOver()){
      this.game.playMove($square.data('pos'));
      $square.addClass("clicked");
      const currentPlayer = this.game.currentPlayer;
      $square.text(currentPlayer.toUpperCase());
      $square.addClass(currentPlayer);

      if(this.game.isOver()){
        $('body').append(`You win, ${currentPlayer}!`);
        $("ul").off("click");
        $("li").removeClass("notOver");
        $(`li`).addClass('loser');
        $(`li.${currentPlayer}`).addClass('winner');
      }
      
    } else {
      alert("Invalid move!");
    }
  }

  setupBoard() {
    const $ul = $("<ul>");

    for(let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++) {
        const $li = $("<li>");
        $li.data('pos', [i,j]);
        $li.addClass("notOver");
        $ul.append($li);
      }
    }

    return this.$el.append($ul);
  }
}

module.exports = View;
