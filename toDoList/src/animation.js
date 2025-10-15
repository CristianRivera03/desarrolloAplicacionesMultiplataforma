import  {animate , stagger , createDraggable, createSpring  } from "animejs";
    animate ( ".clrs",{
        translateX: stagger(25),
        delay: stagger(500, {from: "last"}),
        // scale: 3,
        duration: 1000,
        easing: 'easeInOutQuad',
    })
    

    createDraggable('.note', {
    releaseEase: createSpring({
    stiffness: 120,
    damping: 6,
    })
    })

    createDraggable('.square');




