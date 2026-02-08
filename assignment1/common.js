const STORAGE_KEY = "customLayout";

function getLayout() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : {
        layout: [
          {
            id: "btn1",
            type: "button",
            text: "Button 1",
            width: 120,
            height: 40,
            color: "#4CAF50",
            x: 50,
            y: 50
          },
          {
            id: "btn2",
            type: "button",
            text: "Button 2",
            width: 120,
            height: 40,
            color: "#2196F3",
            x: 50,
            y: 110
          }
        ]
      };
}

function saveLayout(layout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}
