import anime from 'animejs/lib/anime.es.js';

const saliente = (data) => {
  let datosActuales = data.current.container; 
  return anime({
    targets: datosActuales,
    translateY: {
      value: ['0px','540px'],
      duration:300,
      easing: 'easeInOutQuad',
    }
  });
}

const entrante = (data) =>{
  let datosQueEntran = data.next.container;
  return anime({
    targets: datosQueEntran,
    translateY: {
      value: ['-100%','0%'],
      duration: 600,
      easing: 'easeOutBounce'
    },
    scaleY: {
      value: ['0.05', '1'],
      direction:'reverse',
      duration: 500,
      delay: 500,
      easing: 'easeOutCubic'
    },
  });
}



export {
  saliente,
  entrante,
};
