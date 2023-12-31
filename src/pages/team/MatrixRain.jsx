/* eslint-disable */
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const renderMatrix = (ref) => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = 'ATLAS';

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const render = () => {
        context.fillStyle = "rgba(26, 26, 26, 0.30)"; // black w a tiny bit of alpha
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#32CD32"; // pure green
        context.font = fontSize + "px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
            // randomize the string of characters to render
            const text = alphabet.charAt(
                Math.floor(Math.random() * alphabet.length)
            );
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (
                rainDrops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    return () => {
        setInterval(render, 100);
    };
};

const MatrixRainingLetters = (height) => {
    const ref = useRef();
    useEffect(() => renderMatrix(ref), [height]);
    return (
        <React.Fragment>
            <canvas style={{position: 'sticky', top: '0px', backgroundColor: 'rgba(26, 26, 26)', width: '100%', minHeight: `${height}px`, height: `${height}px`, marginTop: '0rem', padding: '0px', zIndex: '0'}} ref={ref}/>
        </React.Fragment>
    );
};

export default MatrixRainingLetters;