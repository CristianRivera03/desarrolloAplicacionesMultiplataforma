import { animate, stagger, createDraggable, createSpring } from "animejs";
animate(".clrs", {
  translateX: stagger(25),
  delay: stagger(500, { from: "last" }),
  // scale: 3,
  duration: 500,
  easing: "easeInOutQuad",
});


