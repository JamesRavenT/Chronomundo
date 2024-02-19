export function sortByTime(listOfAlarms){
   return listOfAlarms.sort(compare);
}

function compare( a, b ) {
    if ( a._order < b._order ){
      return -1;
    }
    if ( a._order > b._order ){
      return 1;
    }
    return 0;
}
  