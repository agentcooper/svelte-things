import Things from "./Things.html";

const data = {
  todos: [
    {
      id: 0,
      title: "Разобрать звезды на гитхабе",
      notes: "",
      done: false,
      category: "Inbox",
    },
    {
      id: 1,
      title: "Зайти к соседу за письмом",
      notes: "",
      done: false,
      category: "Today",
    },
    {
      id: 2,
      title: "Сделать Advent of Code",
      notes: "",
      done: false,
      category: "Today",
    },
  ],
};

var app = new Things({
  target: document.querySelector("main"),
  data,
});

export default app;
