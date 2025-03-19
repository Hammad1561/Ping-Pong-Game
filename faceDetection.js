import * as faceLandmarksDetection from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";

export async function detectFace(videoRef, setPaddleX) {
  const model = await faceLandmarksDetection.load();

  // Create a canvas element for rendering predictions
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "10"; // Ensure it overlays the webcam
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  async function runDetection() {
    if (!videoRef.current || !videoRef.current.video || videoRef.current.video.readyState !== 4) return;

    const video = videoRef.current.video;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const predictions = await model.estimateFaces(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

    if (predictions.length > 0) {
      drawPredictions(predictions, ctx);

      const noseX = predictions[0].annotations.noseTip[0][0]; // Get nose X position
      const normalizedX = ((noseX - 100) / 300) * 100; // Normalize X position to percentage
      setPaddleX(Math.max(0, Math.min(100, normalizedX))); // Keep paddle within bounds
    }

    requestAnimationFrame(runDetection);
  }

  function drawPredictions(predictions, ctx) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      keypoints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      });
    });
  }

  runDetection();
}
