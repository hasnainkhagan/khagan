import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { slides } from "./slides";

const container = document.querySelector(".container");
const projectTitle = document.getElementById("project-title");
const projectLink = document.getElementById("project-link");

let scrollIntensity = 0;
let targetScrollIntensity = 0;
const maxScrollIntensity = 1.0;
const scrollSmoothness = 0.5;

let scrollPosition = 0;
let targetScrollPosition = 0;
const scrollPositionSmoothness = 0.05;

let isMoving = false;
const movementThreshold = 0.001;
let isSnapping = false;

let stableCurrentIndex = 0;
let stableNextIndex = 1;
let isStable = false;

let titleHidden = false;
let titleAnimating = false;
let currentProjectIndex = 0;

projectTitle.textContent = slides[0].title;
projectLink.href = slides[0].url;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 0);
container.appendChild(renderer.domElement);
