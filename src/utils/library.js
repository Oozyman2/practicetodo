function convertDateFormat(dateString) {
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    const suffix = getDaySuffix(day);
    
    return `${day}${suffix} ${month} ${year}`;
  }
  
  function getDaySuffix(day) {
    if ([1, 21, 31].includes(day)) {
      return 'st';
    } else if ([2, 22].includes(day)) {
      return 'nd';
    } else if ([3, 23].includes(day)) {
      return 'rd';
    } else {
      return 'th';
    }
  }
  

  export {convertDateFormat}