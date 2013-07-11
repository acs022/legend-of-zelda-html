(function ($) {

  $.widget("game.controls", {

    options: {

      'menu': false
    },

    position: {
      'x': 46.875,
      'y': 46.66666667,
    },

    speed: {
      'x': 0.64,
      'y': 0.85,
    },

    controller: {

        65: {"name": "a", "active": false, "block": false},
        66: {"name": "b", "active": false, "block": false},
        38: {"name": "up", "active": false, "block": false},
        40: {"name": "down", "active": false, "block": false},
        37: {"name": "left", "active": false, "block": false},
        39: {"name": "right", "active": false, "block": false},
        dPadPriority: [],
    },

    actionTimer: {
      "walk": {"delay": 86, "timer": 64},
      "sword": {"delay": 100, "timer": 100},
    },

    lastAnimation: new Date().getTime(),

    lastFrame: new Date().getTime(),

    animationBlock: false,

    linkSpriteClasses: {
      "up": {
        "main":"link-back",
        "alt":"link-back-alt"
      },
      "down": {
        "main":"link-front",
        "alt":"link-front-alt"
      },
      "left": {
        "main":"link-left",
        "alt":"link-left-alt"
      },
      "right": {
        "main":"link-right",
        "alt":"link-right-alt"
      },
      "sword": {
        "up": "link-sword-back",
        "down": "link-sword-front",
        "left": "link-sword-left",
        "right": "link-sword-right",
      }
    },

    noTravel: {

    },

    currentDirection: "up",


    /*
     * Then we have the _create function
     * This function gets called as soon as your widget is invoked
     * Think of it as the initialization function.
     */
    _create: function() {


      var self = this;


      self._generateLink();

      window.onkeydown = function(e){
        self._setControllerInput(e.which, true);
      };

      window.onkeyup = function(e){
        self._setControllerInput(e.which, false);
        self._clearDelays();
      };

      self.CPUinterval = self._setIntervalWithContext(function () {this._NESCPU(); }, 16, this);
    },

    _generateLink: function () {

        this.element.css("top",this.position.y + "%").css("left", this.position.x + "%");
    },

    _clearDelays: function ()
    {
      for (var key in this.actionClock)
      {
        this.actionClock[key] = this.actionDelay[key];
      }
    },

    _setControllerInput: function (button_id,activation)
    {

      if (typeof this.controller[button_id] == 'undefined') return;

      this.controller[button_id]['active'] = activation;

      if (activation == false)
        this.controller[button_id]['block'] = false;

      if (button_id - 41 < 0) {
        this._updateDPadPriority(button_id, activation);
      }

    },

    _updateDPadPriority: function (button_id, activation) {

      if (activation == false) {
        this.controller.dPadPriority = this.controller.dPadPriority.filter(function(v) {return v != button_id});
      } else if (this.controller.dPadPriority.indexOf(button_id) == -1 && activation == true) {
        this.controller.dPadPriority.unshift(button_id);
      };

    },

    _NESCPU: function ()
    {
      for (var key in this.controller) {
        if (this.controller[key]['active'] == true) {
          this._animateLink(key);
        }
      }
      this._moveLink();
    },

    _animateLink: function (key) {

      switch (this.controller[key]['name']) {

        case 'a':
          if (this.controller[key]['block'] != false) {return;}
          this._sword();
        case 'b':
          break;

        case 'up':
        case 'down':
        case 'left':
        case 'right':
          if (this.controller.dPadPriority.length >= 1) {
            this.moveLink = true;
          }
          break;

      }

    },

    _moveLink: function () {

      if (this.animationBlock == true || this.moveLink != true) {return};

      var button = this.controller.dPadPriority[0];
      this._changeDirection(this.controller[button].name);
      this._changePosition();
      this._alternate('walk');

    },

    _changePosition: function() {

      if (this.moveLink != true) return;

      switch (this.currentDirection) {
        case 'up':
        this.position.y -= this.speed.y;
        break;

        case 'down':
        this.position.y += this.speed.y;
        break;

        case 'left':
        this.position.x -= this.speed.x;
        break;

        case 'right':
        this.position.x += this.speed.x;
        break;
      }

      this.element.css('top',this.position.y + '%').css('left', this.position.x + '%');
      this.moveLink = false;
    },

    _clearInterval: function () {

      clearInterval(this.interval);
      this.interval = undefined;

    },

    _changeDirection: function (direction)
    {

      if (this.currentDirection == direction) return;

      this.element.removeClass();

      this.currentDirection = direction;

      this.element.addClass(this.linkSpriteClasses[direction]['main']);
    },

    _setIntervalWithContext: function (code, delay, context) {
        return setInterval(function () {
            code.call(context);
        }, delay);
    },

    _alternate: function (action) {

      if (this._canAnimate(action) == false) return;

      if (this.element.hasClass(this.linkSpriteClasses[this.currentDirection]['alt'])) {
        this.element.removeClass();
        this.element.addClass(this.linkSpriteClasses[this.currentDirection]['main']);
      } else {
        this.element.removeClass();
        this.element.addClass(this.linkSpriteClasses[this.currentDirection]['alt']);
      }

      this.lastAnimation = new Date().getTime();
    },

    _sword: function () {


      if (this.animationBlock == true) return;

      this.animationBlock = true;
      this.controller[65]["block"] = true;

      this.element.removeClass().addClass(this.linkSpriteClasses['sword'][this.currentDirection]);

      var that = this;

      var sheath = setTimeout(function(){that._sheath();}, 300);
    },

    _sheath: function () {

      this.element.removeClass().addClass(this.linkSpriteClasses[this.currentDirection]['main']);
      this.animationBlock = false;
    },

    _updateTimer: function () {
      this.lastAnimation = new Date().getTime();
    },

    _canAnimate: function (action) {

      var currentTime = new Date().getTime();

      if (this.lastAnimation + this.actionTimer[action]['delay'] < currentTime) {
        return true;
      } else {
        return false;
      }
    },

  });

})(jQuery);