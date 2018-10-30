function Human() {

  console.log('hello');

  const canvasEl = document.getElementById("myCanvas");
  const ctx = canvasEl.getContext("2d");
  // ctx.fillStyle = "blue";
  // ctx.fillRect(300, 350, 100, 100);

  ctx.beginPath();
  ctx.arc(350, 400, 20, 0, 2*Math.PI, true);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.font = 20 + 'pt Arial';
  ctx.fillText("HUMAN", 310, 370);
}

// module.exports = Human;
export default Human;
