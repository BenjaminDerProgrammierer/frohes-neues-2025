import p5 from 'p5';
import { Firework } from './firework';

export const sketch = (p: p5) => {
  const fireworks: Firework[] = [];
  let silvesterFont: p5.Font;

  p.preload = () => {
    silvesterFont = p.loadFont('assets/Silvester.ttf');
  }

  p.setup = async () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    Firework.gravity = p.createVector(0, 0.005);
    p.frameRate(60);

    for (let i = 0; i < 10; i++) {
      const Farbe = p.random(0, 360); // Farbe (0-360)
      const Größe = p.random(10, 20); // Größe der Explosion
      const Anzahl = 5; // Anzahl der Raketen
      let Hoehe: number;
      for (let j = 0; j < Anzahl; j++) {
        if (j % 2 == 0)
          Hoehe = 90;
        else
          Hoehe = 67.5;
        fireworks.push(
          new Firework(p, Farbe, (((p.width - 400) * j) / (Anzahl - 1)) + 200, Hoehe + p.random(-5, 5), Größe + p.random(-5, 5))
        );
      }
      await delay(3000);
    }
  }

  p.draw = () => {
    p.colorMode(p.RGB);
    p.background(0, 0, 0, 25);
  
    p.fill('red');
    p.textSize(60);
    p.textStyle(p.BOLD)
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(silvesterFont);
  
    p.text('Frohes neues \n 2025!', p.width / 2, p.height / 4);
    for (let i = 0; i <= fireworks.length - 1; i++) {
      fireworks[i].draw();
  
      if (fireworks[i].isDone) {
        fireworks.splice(i, 1);
      }
    }
  }

  function delay(millis: number): Promise<void> {
    return new Promise<void>((res) => setTimeout(res, millis));
  }
}

export const app = new p5(sketch, document.body);
