const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#message-1");
const p2 = document.querySelector("#message-2");
const p3 = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  p1.textContent = "loading...";
  p2.textContent = "";
  p3.textContent = "";
  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (p2.textContent = data.error);
      }
      p1.textContent = data.location;
      p2.textContent = data.forecast;
      p3.textContent = "The datas are came from a free weather api";
    });
  });
});
