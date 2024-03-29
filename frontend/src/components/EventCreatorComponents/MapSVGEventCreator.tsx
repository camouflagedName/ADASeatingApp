import { useState, useRef } from "react";
import SeatsLayoutCreator from "./SeatsLayoutCreator";
import { Center, Flex } from "@chakra-ui/react";
//import Path from "../SVGComponents/old_Path";
import SVGLayout from "../SVGComponents/SVGLayout";
import { ISeatMeta } from "../../interfaces/creatorInterfaces";
import InteractiveSection from "../SVGComponents/InteractiveSection";

interface ViewBox {
    minX: number;
    minY: number;
    width: number;
    height: number;
}

const baseViewBox: ViewBox = {
    minX: 0,
    minY: 0,
    width: 10240,
    height: 7680,
}

const MapSVGEventCreator = ({ seatMeta, updateMeta, height }: { seatMeta: ISeatMeta, updateMeta: React.Dispatch<React.SetStateAction<ISeatMeta>>, height: number }) => {
    const [viewBox, setViewBox] = useState(baseViewBox);

    const svgRef = useRef<SVGSVGElement | null>(null);
    const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
    const previousTouchDistanceRef = useRef<number | null>(null);

    const mapDimensions = {
        width: 1024,
        height: height || 750
    }

    const getDistance = (xDist: number, yDist: number) => Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    const handleTouchStart = (evt: React.TouchEvent<SVGElement>) => {
        const touch1 = evt.touches[0];
        if (evt.touches.length === 1) {
            lastTouchRef.current = { x: touch1.clientX, y: touch1.clientY };
        } else if (evt.touches.length === 2) {
            const touch2 = evt.touches[1];
            const xValue = touch1.clientX - touch2.clientX
            const yValue = touch1.clientY - touch2.clientY
            const initDistance = getDistance(xValue, yValue);

            previousTouchDistanceRef.current = initDistance;
        }

    }

    const handleTouchMove = (evt: React.TouchEvent<SVGElement>) => {
        const touch1 = evt.touches[0];
        const lastTouch = lastTouchRef.current;
        const prevTouchDistance = previousTouchDistanceRef.current;
        if (evt.touches.length === 1 && lastTouch && svgRef.current) {
            const deltaX = touch1.clientX - lastTouch.x;
            const deltaY = touch1.clientY - lastTouch.y;
            const ratio = viewBox.width / svgRef.current.getBoundingClientRect().width;
            const newMinX = viewBox.minX - (deltaX * ratio);
            const newMinY = viewBox.minY - (deltaY * ratio);

            setViewBox({
                ...viewBox,
                minX: newMinX,
                minY: newMinY
            })

            lastTouchRef.current = { x: touch1.clientX, y: touch1.clientY };

        } else if (evt.touches.length === 2 && svgRef.current && prevTouchDistance) {
            const touch2 = evt.touches[1];
            const xDelta = touch1.clientX - touch2.clientX;
            const yDelta = touch1.clientY - touch2.clientY;
            const newDistance = getDistance(xDelta, yDelta);

            if (Math.abs(newDistance - prevTouchDistance) > 5) {
                const CONSTANT = 1.1
                const scaleAdjust = newDistance > prevTouchDistance ? CONSTANT : 1 / CONSTANT
                const scale = (newDistance / prevTouchDistance) * scaleAdjust;
                const newWidth = viewBox.width / scale;
                const newHeight = viewBox.height / scale;
                const newMinX = viewBox.minX + (viewBox.width - newWidth) / 2;
                const newMinY = viewBox.minY + (viewBox.height - newHeight) / 2;
                const newViewBox: ViewBox = {
                    minX: newMinX,
                    minY: newMinY,
                    width: newWidth,
                    height: newHeight,
                }

                previousTouchDistanceRef.current = newDistance;

                if (newViewBox.width < baseViewBox.width * 2 && newViewBox.width > baseViewBox.width * .05) {
                    setViewBox(newViewBox)
                }
            }
        }
    }


    const tierA = (
        <g id="TIER_A">
            <InteractiveSection
                id="TIERAR"
                dString="M5560.9,2523.4L5560.9,3450.769263474873L6102.3007883244145,3450.769263474873L6102.3007883244145,3212.1162880253028L6333.396730540437,3212.1162880253028L6333.396730540437,2523.4z" />
        </g>
    );

    const tierC = (
        <g id="TIER_C">
            <InteractiveSection
                id="TCRCT"
                dString="M7367.75,2696.5L7367.75,3839.8L7825.27,3839.8L7825.27,2696.5z" />
            <InteractiveSection id="TRCLFT"
                dString="M7367.54537507307,4929.8L7367.77,5244.373124634648L7205.8,5490.003124634648L7597.41,5748.223124634648L7825.290000000001,5402.643124634648L7825.145375073071,4929.85z" />
            <InteractiveSection id="TRCRHT"
                dString="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z" />
            <InteractiveSection id="TRCLCR"
                dString="M7367.75,3840.8L7367.89537507307,4929.645375073071L7825.0953750730705,4929.645375073071L7825.27,3840.8z" />
        </g>
    );

    const secondFloorWings = (
        <g id="2nd_Floor_Wings">
            <g id="2nd_Floor_Right_Wing">
                <InteractiveSection id="2FRTWG"
                    dString="M6433.55,2140.05L6274,2245.3232223894956L6430.336777610506,2481.1067776105047L6589.599999999999,2376.75z" />
            </g>
            <g id="2nd_Floor_Left_Wing">
                <InteractiveSection id="2FLTWG"
                    dString="M6433.57,5191.85L6278.9,5425.590000000001L6433.473222389495,5530.973222389495L6589.623222389495,5294.2732223894955z" />
            </g>
        </g>
    );

    const thirdFloorWings = (
        <g id="3rd_Floor_Wings">
            <g id="3rd_Floor_Left_Wing">
                <InteractiveSection id="3FLWG"
                    dString="M8088.273222389496,5099.75L7918.05,5360L8077.373222389496,5465.1L8247.923222389496,5205.073222389496z" />
            </g>
            <g id="3rd_Floor_Right_Wing">
                <InteractiveSection id="3FRTWG"
                    dString="M8082.35,2213.05L7918,2317.1232223894954L8089.373222389495,2578.9232223894955L8250.923222389496,2472.5732223894956z" />
            </g>
        </g>
    );


    return (
        <Flex style={{ background: "rgb(232, 236, 242)", justifyContent: "center", maxHeight: "100%", overflow: "auto" }}>
            <Center style={{ maxHeight: "100vh" }}>
                <svg
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    version="1.1"
                    viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
                    x="0px"
                    y="0px"
                    width={mapDimensions.width}
                    height={mapDimensions.height}
                    style={{ maxWidth: "100%", minWidth: "100%", minHeight: "100%" }}
                    xmlns="http://www.w3.org/2000/svg"
                    ref={svgRef}
                >
                    <defs>
                        <filter id="ISM_Shadow" filterUnits="objectBoundingBox">
                            <feGaussianBlur in="SourceAlpha" result="blur" stdDeviation="5" />
                            <feOffset dx="0" dy="0" in="blur" result="offsetBlurredAlpha" />
                            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="offsetBlurredAlpha" result="colorMatrix" />
                            <feMerge>
                                <feMergeNode in="colorMatrix" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <SVGLayout
                        tierA={tierA}
                        tierC={tierC}
                        secondFloorWings={secondFloorWings}
                        thirdFloorWings={thirdFloorWings} />
                    <SeatsLayoutCreator seatMeta={seatMeta} updateMeta={updateMeta} />
                </svg>
            </Center>
        </Flex>
    )
}

export default MapSVGEventCreator;