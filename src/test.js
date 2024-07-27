class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return "Underflow";
      }
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  function findCommonPattern(str1, str2, pattern) {
    return str1.includes(pattern) && str2.includes(pattern) ? pattern : '';
  }
  
  // Example usage
  let str1 = "committer_list_per_month[date + '-' + log[i].author] = 1;";
  let str2 = "var date_author = date + '-' + log[i].author;";
  let pattern = "date + '-' + log[i].author";
  
  let commonPattern = findCommonPattern(str1, str2, pattern);
  
  console.log(commonPattern); // "date + '-' + log[i].author"
  