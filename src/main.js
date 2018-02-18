import Things from "./Things.html";

const withId = (arr, category = "Today") =>
  arr.map((todo, index) =>
    Object.assign({ id: index, notes: "", category }, todo),
  );

const data = {
  todos: withId([
    {
      title: "Buy Things 3 app",
      done: true,
      category: "Inbox",
    },
    {
      title: "Learn guitar",
      done: false,
      category: "Someday",
    },
    {
      title: "Finish this app",
      done: false,
      category: "Anytime",
    },
    {
      title: "Todo: select animation",
      done: true,
    },
    {
      title: "Todo: double click animation",
      done: true,
    },
    {
      title: "Ctrl + N shortcut",
      done: true,
    },
    {
      title: "Todo: checkbox checked animation",
      done: false,
    },
    {
      title: "Popups",
      done: false,
    },
    {
      title: "New todo: edit title",
      done: false,
    },
  ]),
};

var app = new Things({
  target: document.querySelector("main"),
  data,
});

export default app;
