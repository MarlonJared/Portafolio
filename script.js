document.addEventListener("DOMContentLoaded", function () {
  const svg = document.querySelector("svg");
  const pointLight = document.querySelector("#point-light");

  function handleMove(event) {
      const x = event.clientX || event.touches?.[0]?.clientX;
      const y = event.clientY || event.touches?.[0]?.clientY;

      if (x && y) {
          pointLight.setAttribute("x", x  );
          pointLight.setAttribute("y", y -100);
      }
  }

  svg.addEventListener("mousemove", handleMove);
  svg.addEventListener("touchmove", handleMove);
});
