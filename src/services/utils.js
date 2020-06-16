import Constants from "./globalConstants";

//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getOpposite(edge){
    switch(edge){
        case Constants.TOP:
            return Constants.BOTTOM;
        case Constants.BOTTOM:
            return Constants.TOP;
        case Constants.LEFT:
            return Constants.RIGHT;
        case Constants.RIGHT:
            return Constants.LEFT;
        default:
            return null;
    }
}