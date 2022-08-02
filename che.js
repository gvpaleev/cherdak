options = {
    size: {
      width: 100,
      height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
  };
  
  // деструктуризация разбита на несколько строк для ясности
const {
    size: { // положим size сюда
      width,
      height
    },
    items: [item1, item2], // добавим элементы к items
    title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
  } = options;

  console.log(width)