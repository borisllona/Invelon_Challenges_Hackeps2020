import React, { useEffect, useState } from 'react';

//Other library with no that much success...
import GCodeLoader from 'three-gcode-loader';

//import { GCodeLoader } from "three/examples/jsm/loaders/GCodeLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import UploadButtonComponent from '../components/UploadButtonComponent';
import ThreeSceneContainer from './ThreeSceneContainer';


const LandingPageContainer = () => {

    const [object3D, setObject3D] = useState([[]]);
    const [firstLayer, setFirstLayer] = useState(0);
    const [lastLayer, setLastLayer] = useState(0);

    var loader = new GCodeLoader();

    // On file select (from the pop up)
    const onFileChange = event => {
        const file = event.target.files[0];
        getBase64(file).then(
            data => localStorage.setItem("fileGcode", data)
        ).catch(e => console.log(e));
    };

    const onFileLoad = () => {
        loader.load(localStorage.getItem("fileGcode"), object => { setObject3D(object); setLastLayer(object[0].lenght) });
    }

    // useEffect(
    //     () => {
    //         let last = 0;
    //         if (object3D) { last = object3D[0].length }
    //         setLastLayer(last);
    //     }, [object3D]);

    // useEffect(
    //     () => {
    //         const renderer = new THREE.WebGLRenderer();
    //         renderer.setPixelRatio(window.devicePixelRatio);
    //         renderer.setSize(window.innerWidth, window.innerHeight);
    //         document.body.appendChild(renderer.domElement);

    //         const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    //         let camPoint = { isVector3: true, x: 0, y: 0, z: 0 };
    //         const scene = new THREE.Scene();

    //         const material = new THREE.LineBasicMaterial({ color: 0x61ff00 });

    //         loader.load(localStorage.getItem("fileGcode"), object => {
    //             console.log(object[0].length);
    //             setLastLayer(object[0].length);
    //             if (object[0][3][0][0]) {
    //                 camPoint = object[0][3][0][0];
    //             }
    //             const points = [];
    //             console.log(firstLayer, lastLayer);
    //             for (let l = firstLayer; l < lastLayer; l++) {
    //                 object[0][l].forEach(linee => {
    //                     linee.forEach(point => {
    //                         if (point) {
    //                             points.push(new THREE.Vector3(point.x, point.y, point.z));
    //                         }
    //                     });
    //                 });
    //             }

    //             const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //             const line = new THREE.Line(geometry, material);
    //             scene.add(line);

    //             camera.lookAt(camPoint);
    //             renderer.render(scene, camera);

    //         });

    //         // ############ START THREE JS LOADER
    //         // loader.load(localStorage.getItem("fileGcode"), object => {
    //         //     object.position.set( - 100, - 20, 100 );
    //         //     scene.add(object);
    //         //     renderer.render(scene, camera);
    //         // });

    //         const controls = new OrbitControls(camera, renderer.domElement);
    //         controls.addEventListener('change', () => {
    //             camera.lookAt(camPoint);
    //             renderer.render(scene, camera)
    //         });
    //         controls.minDistance = 10;
    //         controls.maxDistance = 100;
    //     }, [ firstLayer, lastLayer]);

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const changeFirst = ev => {
        // if (ev.target.value >= maxLayer - 1) setFirstLayer(maxLayer - 1)
        // else setFirstLayer(ev.target.value);
        // if (firstLayer >= lastLayer) setLastLayer(firstLayer + 1);
        setFirstLayer(ev.target.value);
    };

    const changeLast = ev => {
        const newLast = ev.target.value;
        console.log(newLast)
        setLastLayer(newLast);
    };

    return (
        <div>
            <UploadButtonComponent onChange={onFileChange} onClick={onFileLoad} />
            <ThreeSceneContainer
                gcodeData={object3D}
                changeFirst={changeFirst}
                changeLast={changeLast} 
                firstLayer={firstLayer}
                lastLayer={lastLayer}
                setLastLayer={setLastLayer}
                />
        </div>

    );
};

export default LandingPageContainer;