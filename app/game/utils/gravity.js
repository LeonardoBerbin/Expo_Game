/* Simula el efecto gravedad ejerciendo una fuerza de signo negativo. 
 * Requiere importar collision para sunfuncionamiento
*/
import collision from './collision.js';

/* Introduce la propiedad gravity dentro del objeto
 * array: objetos en el mapa
 * object: objeto expuesto
 * jumpForce: fuerza anti gravedad de signo positivo
*/ 
const gravity = (array, object, jumpForce=0) => {
  const g = -0.1;
  object.gravity = {
    force: 0, 
    // Esta funcion debe ser invocada solo una vez en el constructor del objeto, siempre que ya se haya establecido la frecuencia de renderizado
    init(){
      // incremento de fuerza y deteccion de colisiones en el eje 'y'
      this.force += g;
      const movement = collision.y(array, object, this.force);
       
       // Se ejecuta ante colisiones 
       if(movement.max === 0){
          // Cuando el objeto va en caida 
          if(this.force < 0){
            this.force = 0;
            // retorna la superficie
            return surface = movement.closest;
          }
          // Cuando el objeto esta ascendiendo
          else {
            // Accion - Reaccion
            this.force -= this.jumpForce;
            // retorna el obstacull
            return obstacle = movement.closest;
          };
       };
       // Actualiza la posicion 'y' del objeto 
       object.position.y += movement.max;
    },
    
    // propiedad anti gravedad 
    jumpForce: Math.abs(jumpForce),
    jump(){
      if(this.force !== 0) return;
      this.force = this.jumpForce;
    }
  };
};

// exporta el complemento gravity
export default gravity;



