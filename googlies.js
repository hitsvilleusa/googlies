var Googlies = function(canvasId) {
  // Not sure how else to add the event and reference 'this'
  var _self        = this;
  
  this.canvasId    = canvasId;
  this.canvas      = document.getElementById(this.canvasId);
  this.context     = this.canvas.getContext("2d");        

  this.eyeRadius   = 0.45 * (Math.min(this.canvas.width / 2, this.canvas.height));

  this.pupilRadius = 0.3  * this.eyeRadius;
  this.center1x    = this.canvas.width  * 0.25;
  this.center2x    = this.canvas.width  * 0.75;
  this.center1y    = this.canvas.height / 2.0;
  this.center2y    = this.canvas.height / 2.0;
          
          
  this.lookAt = function(x, y) {
    _self.context.clearRect(0,0,_self.canvas.width,_self.canvas.height);
    _self.drawEye(_self.center1x, _self.center1y, x, y);
    _self.drawEye(_self.center2x, _self.center2y, x, y);
  }
  
  this.drawEye = function(centerX, centerY, pupilX, pupilY) {
    var gradient = _self.context.createRadialGradient(centerX, 
                                                      centerY, 
                                                      _self.eyeRadius, 
                                                      centerX - _self.pupilRadius, 
                                                      centerY - _self.pupilRadius, 
                                                      _self.eyeRadius);
  
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "white");
  
    _self.context.fillStyle   = gradient;
    _self.context.lineWidth   = 2;
    _self.context.strokeStyle = "black";
    
    _self.context.beginPath();
    _self.context.arc(Math.round(centerX),Math.round(centerY),Math.round(_self.eyeRadius), 0, Math.PI * 2 , true);
    _self.context.closePath();
    _self.context.fill();
    _self.context.stroke();

    if (!(_self.distanceBetween(centerX, centerY, pupilX, pupilY) <= (_self.eyeRadius - _self.pupilRadius))){
      var ratio = (_self.eyeRadius - _self.pupilRadius) / _self.distanceBetween(centerX, centerY, pupilX, pupilY);
  
      pupilX = ratio * (pupilX - centerX) + centerX;
      pupilY = ratio * (pupilY - centerY) + centerY;
    }
    
    _self.context.beginPath();
    _self.context.arc(Math.round(pupilX),
                      Math.round(pupilY),
                      Math.round(_self.pupilRadius), 
                      0, 
                      Math.PI * 2 , 
                      true);
    _self.context.closePath();
    _self.context.fillStyle = "black";
    _self.context.fill();
  }
  
  this.distanceBetween = function(x1, y1, x2, y2) {
    var width  = x2 - x1;
    var height = y2 - y1;
  
    return Math.abs(Math.sqrt(width * width + height * height));
  }
  
  this.canvas.addEventListener("mousedown", function(e){
    window.location = "http://www.chrismorris.net";
  }, false);

  window.addEventListener("mousemove", function(e) {
      var x = e.pageX - _self.canvas.offsetLeft;
      var y = e.pageY - _self.canvas.offsetTop;
      
      _self.lookAt(x, y);
  }, false);
  
  this.lookAt(this.width / 2, this.height);
};