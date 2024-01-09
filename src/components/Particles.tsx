import React, {useCallback, useEffect, useRef} from 'react';

const PI2 = Math.PI * 2;

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface ParticleProps {
    x: number;
    y: number;
    radius: number;
    rgb: RGB;
}

class GlowParticle {
    x: number;
    y: number;
    radius: number;
    rgb: RGB;
    vx: number;
    vy: number;
    sinValue: number;

    constructor({x, y, radius, rgb}: ParticleProps) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vx = Math.random() * 4;
        this.vy = Math.random() * 4;

        this.sinValue = Math.random();
    }

    animate(ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number) {
        this.sinValue += 0.01

        this.radius += Math.sin(this.sinValue);

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.vx *= -1;
            this.x += 10;
        } else if (this.x > stageWidth) {
            this.vx *= -1;
            this.x -= 10;
        }

        if (this.y < 0) {
            this.vy *= -1;
            this.y += 10;
        } else if (this.y > stageHeight) {
            this.vy *= -1;
            this.y -= 10;
        }

        ctx.beginPath();
        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.01,
            this.x,
            this.y,
            this.radius
        );
        g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`);
        g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);
        ctx.fillStyle = g;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }
}

const COLORS: RGB[] = [
    {r: 223, g: 133, b: 214}, //#DF85D6
    {r: 145, g: 236, b: 203}, //#91ECCB
    {r: 186, g: 184, b: 243}, // #BAB8F3
    {r: 249, g: 183, b: 199}, //#F9B7C7
    {r: 251, g: 232, b: 135}, //#FBE887
    {r: 119, g: 213, b: 237}, //#F9B7C7
    {r: 234, g: 236, b: 198}, //#FBE887
];

interface ParticlesProps {
}

const totalParticles = 14;
const maxRadius = 500;
const minRadius = 300;

const Particles: React.FC<ParticlesProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const particles = useRef<GlowParticle[]>([]);

    const createParticles = useCallback((stageWidth: number, stageHeight: number, ctx: CanvasRenderingContext2D | null) => {
        if (!ctx) return;

        let curColor = 0;
        particles.current = [];

        for (let i = 0; i < totalParticles; i++) {
            const item = new GlowParticle(
                {
                    x: Math.random() * stageWidth,
                    y: Math.random() * stageHeight,
                    radius: Math.random() * (maxRadius - minRadius) + minRadius,
                    rgb: COLORS[curColor]
                }
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }

            particles.current[i] = item;
        }
    }, [totalParticles, maxRadius, minRadius]);

    const resize = useCallback(() => {
        if (canvasRef.current) {
            const stageWidth = document.body.clientWidth;
            const stageHeight = document.body.clientHeight;
            const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

            canvasRef.current.width = stageWidth * pixelRatio;
            canvasRef.current.height = stageHeight * pixelRatio;

            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.scale(pixelRatio, pixelRatio);
                ctx.globalCompositeOperation = 'saturation';
            }

            createParticles(stageWidth, stageHeight, ctx);
        }
    }, [createParticles]);

    const animate = useCallback(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
                particles.current.forEach(particle => {
                    particle.animate(ctx, document.body.clientWidth, document.body.clientHeight);
                });
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', resize);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [resize, animate]);

    useEffect(() => animate(), []);

    return <canvas
        ref={canvasRef}
        className="absolute -z-10 top-0 left-0 w-full h-full"/>;
};

export default Particles;
