import React, { useEffect, useState } from "react";
import * as THREE from "three";

import GCodeLoader from 'three-gcode-loader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeSceneContainer = ({
    changeFirst,
    changeLast,
    firstLayer,
    lastLayer,
    setLastLayer
}) => {

    // const [maxLayer, setMaxLayer] = useState(gcodeData[0].lenght);

    var loader = new GCodeLoader();

    useEffect(() => {
        if (localStorage.getItem("fileGcode")) {
            const renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            const canvasContainer = document.getElementById("canvas");
            const newCanvas = renderer.domElement;
            if (canvasContainer.childNodes.length > 0) { canvasContainer.replaceChild(newCanvas, canvasContainer.childNodes[0]) }
            else { canvasContainer.appendChild(newCanvas); }

            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            let camPoint = { isVector3: true, x: 0, y: 0, z: 0 };
            const scene = new THREE.Scene();

            const material = new THREE.LineBasicMaterial({ color: 0x61ff00 });


            loader.load(localStorage.getItem("fileGcode"), object => {
                setLastLayer(object[0].length);
                if (object[0][3][0][0]) {
                    camPoint = object[0][3][0][0];
                }
                const points = [];
                console.log(firstLayer, lastLayer);

                // ### Stronger IF condition but it does not work

                // if (firstLayer !== undefined && lastLayer !== undefined 
                //     && firstLayer !== "" && lastLayer !== ""
                //     && firstLayer >= 0 && firstLayer < lastLayer && lastLayer <= maxLayer) {
                for (let l = firstLayer; l < lastLayer; l++) {
                    if (object[0][l]) {
                        object[0][l].forEach(linee => {
                            linee.forEach(point => {
                                if (point) {
                                    points.push(new THREE.Vector3(point.x, point.y, point.z));
                                }
                            });

                        });
                    }
                }
                // }

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(geometry, material);
                scene.add(line);

                camera.lookAt(camPoint);
                renderer.render(scene, camera);

            });

            // ############ START THREE JS LOADER
            // loader.load(localStorage.getItem("fileGcode"), object => {
            //     object.position.set( - 100, - 20, 100 );
            //     scene.add(object);
            //     renderer.render(scene, camera);
            // });

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', () => {
                camera.lookAt(camPoint);
                renderer.render(scene, camera)
            });
            controls.minDistance = 10;
            controls.maxDistance = 100;
        }
    }, [firstLayer, lastLayer]);

    return (
        <>
            <div>
                <input type="number" value={firstLayer} onChange={changeFirst}></input>
                <input type="number" value={lastLayer} onChange={changeLast}></input>
            </div>
            <div id="canvas" />
        </>
    );
};

export default ThreeSceneContainer;