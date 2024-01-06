import React, { useEffect, useRef, useCallback } from 'react';

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

    constructor({ x, y, radius, rgb }: ParticleProps) {
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
    { r: 213, g: 88, b: 200 }, //#d558c8
    { r: 36, g: 210, b: 146 }, //#24d292
    { r: 151, g: 149, b: 240 }, // #9795F0
    { r: 251, g: 200, b: 212 }, //#FBC8D4
    { r: 249, g: 212, b: 35 }, //#F9D423
];

interface ParticlesProps { }

const Particles: React.FC<ParticlesProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const particles = useRef<GlowParticle[]>([]);
    const totalParticles = 15;
    const maxRadius = 180;
    const minRadius = 80;

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

    return <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full" />;
};

export default Particles;
