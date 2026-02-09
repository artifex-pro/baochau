"use client";

import React, {useEffect, useRef, useState} from "react";

function FlyingHearts({count = 28}: {count?: number}) {
    return (
        <div className="hearts pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
            {Array.from({length: count}).map((_, i) => {
                const sizePx = 40 + Math.random() * 36; // 12px → 48px
                const size = `${sizePx}px`;

                const opacity = 0.18 + (sizePx / 48) * 0.35;

                const dur = 16 - (sizePx / 48) * 6 + Math.random() * 2;

                const left = `${Math.random() * 100}vw`;
                const drift = `${-60 + Math.random() * 120}px`;

                return (
                    <span
                        key={i}
                        className="heart"
                        style={
                            {
                                ["--left" as any]: left,
                                ["--size" as any]: size,
                                ["--opacity" as any]: opacity,
                                ["--dur" as any]: `${dur}s`,
                                ["--drift" as any]: drift,
                                animationDelay: `${Math.random() * 8}s`,
                            } as React.CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
}

export default function Page() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);

    const yesButtonSize = noCount * 20 + 16;

    const [noPosition, setNoPosition] = useState({x: 0, y: 0});

    const playgroundRef = useRef<HTMLDivElement | null>(null);
    const yesRef = useRef<HTMLButtonElement | null>(null);
    const noRef = useRef<HTMLButtonElement | null>(null);

    const getNoButtonText = () => {
        const phrases = [
            "No?? Like… actually no? 🤨",
            "Wait hold on, rethink that",
            "What if Dion asks again but cuter?",
            "Okay but imagine yes for a second",
            "Pretty please?",
            "PRETTY please?",
            "I am being very charming right now",
            "This is Dion doing puppy eyes",
            "Wow. Rejected. Bold.",
            "Are you sure you want this on your record?",
            "I would be an elite Valentine",
            "This could’ve been romantic",
            "I have snacks and good vibes",
            "No… :( 💔",
        ];
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    const overlaps = (
        a: { left: number; top: number; right: number; bottom: number },
        b: { left: number; top: number; right: number; bottom: number },
    ) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

    const moveNoButton = () => {
        const playground = playgroundRef.current;
        const yes = yesRef.current;
        const no = noRef.current;

        if (!playground || !yes || !no) return;

        const p = playground.getBoundingClientRect();
        const y = yes.getBoundingClientRect();
        const n = no.getBoundingClientRect();

        const maxX = Math.max(0, p.width - n.width);
        const maxY = Math.max(0, p.height - n.height);

        const yesRect = {
            left: y.left - p.left,
            top: y.top - p.top,
            right: y.right - p.left,
            bottom: y.bottom - p.top,
        };

        for (let i = 0; i < 60; i++) {
            const x = Math.random() * maxX;
            const yy = Math.random() * maxY;

            const noRect = {
                left: x,
                top: yy,
                right: x + n.width,
                bottom: yy + n.height,
            };

            if (!overlaps(noRect, yesRect)) {
                setNoPosition({x, y: yy});
                return;
            }
        }

        setNoPosition({x: maxX, y: maxY});
    };

    const handleNoClick = () => {
        setNoCount((c) => c + 1);
        moveNoButton();
    };

    useEffect(() => {
        const tick = () => moveNoButton();
        tick();

        window.addEventListener("resize", tick);
        return () => window.removeEventListener("resize", tick);
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-pink-100">
            {/* Flying hearts background */}
            <FlyingHearts count={28} />

            {/* Content */}
            <div className="-mt-16 relative z-10 flex h-screen flex-col items-center justify-center">
                {yesPressed ? (
                    <>
                        <img
                            className="mt-2 h-[120px] w-auto"
                            src={`${import.meta.env.BASE_URL}img.png`}
                            alt="extra cute"
                        />

                        <div className="my-4 text-4xl font-bold">
                            WOOOOOO!!! I love you my baby angel!! ;))
                        </div>
                    </>
                ) : (
                    <>
                    <div className="flex items-center justify-center gap-4">
                        <img
                            className="h-[200px]"
                            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHJwM3kxenM0c253Yjc2M2dnaXIwMzgxZXR0aDB2Z3p6ZGt2dTNtMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/gCxd0kUSR6I9dflWgm/giphy.gif"
                            alt="cute bear"
                        />
                        <img
                            className="h-[200px]"
                            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2F5d2NoNWczcmhpbHlweDB1Nzh0czUwNWkxdXNmbnc4dHY2aG4yZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/6zAvc4UaGEvl2K1xv1/giphy.gif"
                            alt="cute bear"
                        />
                        <img
                            className="h-[200px]"
                            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHN1bDVjZnBkanYxd3AxaWUyMDR1MnA5emZvYnNsZzhmdXcyajUxaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/v9VrsKHg32VMfv89lm/giphy.gif"
                            alt="cute bear"
                        />
                    </div>

                        <h1 className="my-4 text-4xl">
                            Will you be my Valentine?
                        </h1>

                        <div className="flex items-center justify-center">
                            <button
                                ref={yesRef}
                                className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 shadow-lg shadow-green-300/50"
                                style={{fontSize: yesButtonSize}}
                                onClick={() => setYesPressed(true)}
                            >
                                Yes
                            </button>
                        </div>
                    </>
                )}
            </div>

            {!yesPressed && (
                <div ref={playgroundRef} className="pointer-events-none absolute inset-0 z-20">
                    <button
                        ref={noRef}
                        onClick={handleNoClick}
                        style={{
                            left: noPosition.x,
                            top: noPosition.y,
                        }}
                        className="pointer-events-auto absolute rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 transition-all duration-200"
                    >
                        {noCount === 0 ? "No" : getNoButtonText()}
                    </button>
                </div>
            )}
        </div>
    );
}
