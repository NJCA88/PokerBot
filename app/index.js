/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

// const Human = require("./human.js");
import Human from './human';

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = 800;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 500);

  // ctx.beginPath();
  // ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
  // ctx.strokeStyle = "green";
  // ctx.lineWidth = 5;
  // ctx.stroke();
  // ctx.fillStyle = "blue";
  // ctx.fill();

  new Human;
});
