const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#message-1");
const p2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  p1.textContent = "loading...";
  p2.textContent = "";
  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (p2.textContent = data.error);
        }
        p1.textContent = data.location;
        p2.textContent = data.forecast;
      });
    }
  );
});
