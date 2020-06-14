//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOpposite(edge){
    switch(edge){
        case TOP:
            return BOTTOM;
        case BOTTOM:
            return TOP;
        case LEFT:
            return RIGHT;
        case RIGHT:
            return LEFT;
        default:
            return null;
    }
}