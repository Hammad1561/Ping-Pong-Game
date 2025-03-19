# Face Pong - Camera-Controlled Game 🎮📷

## **Overview**
Face Pong is a web-based game built with **React** that uses **TensorFlow.js** for facial tracking. The player moves the paddle using their **nose position** detected through the webcam.

## **How It Works**
1. **Webcam Access** - The app uses `react-webcam` to access the camera.
2. **Face Detection** - `@tensorflow-models/facemesh` tracks the position of the player’s **nose**.
3. **Paddle Movement** - The paddle moves up and down based on the **Y-coordinate of the nose**.
4. **Gameplay** - The goal is to hit the ball using face movements.

## **Installation & Running the Game**
### **1️⃣ Install Dependencies**
Make sure you have **Node.js** installed. Then, run:

```sh
npm install
