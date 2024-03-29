import { ComponentType, useContext, useEffect, useState } from "react";
import { ISeat } from "../../interfaces/interfaces";
import { LiveEventContext } from "../../context/context";
import { IAppLiveEventData } from "../../interfaces/liveEventInterfaces";

interface ToolTipData {
    cx: string;
    cy: string;
    patronID: string;
}

interface SeatComponentProps {
    cx: string;
    cy: string;
    seatAvailable: boolean;
    seatData: ISeat;
    popoverToggle: () => void;
    handleToolTipData: (param?: ToolTipData) => void;
    isOpen: boolean;
    zoomFactor: number;
}

interface PassedProps {
    cx: string;
    cy: string;
    seatID: string;
    seatColor: string;
    handleClick: (param: SVGCircleElement | undefined) => void;
}

const withLiveEventSeatLogic = <P extends SeatComponentProps>(WrappedComponent: ComponentType<PassedProps>) => {
    const SeatComponent: React.FC<P> = (props) => {
        const { seatData, seatAvailable, popoverToggle, handleToolTipData, isOpen: toolTipIsOpen } = props;
        const [seatColor, setSeatColor] = useState("#ebebeb");
        //const [seatIsSelected, setSeatIsSelected] = useState(false);
        const data = useContext(LiveEventContext);
        const { addSelectedSeat, removeSelectedSeat } = data as IAppLiveEventData;
        //const resizeFactor = svgHeight / 750;


        const handleClick = (circleElement: SVGCircleElement | undefined) => {
            if (seatData.available) {
                if (seatColor === "#9fc5ef") {
                    setSeatColor("#026cdf");
                    removeSelectedSeat(seatData);
                } else {
                    addSelectedSeat(seatData);
                    setSeatColor("#9fc5ef");
                }
            } else {
                if (circleElement) {
                    const circleRect = circleElement.getBoundingClientRect();
                    const cxToString = String((circleRect.left + circleRect.width + 15));
                    const cyToString = String((circleRect.top + circleRect.height / 2) - 85); 

                    if (toolTipIsOpen) {
                        handleToolTipData();
                    }
                    else {
                        handleToolTipData({
                            cx: cxToString + "px",
                            cy: cyToString + "px",
                            patronID: seatData.assignedTo
                        });
                    }
                    popoverToggle();
                }
            }
        }

        useEffect(() => {
            setSeatColor(seatAvailable ? "#026cdf" : "#ebebeb")
        }, [seatAvailable])


        return (
            <WrappedComponent
                {...props as P}
                seatID={seatData._id}
                seatColor={seatColor}
                handleClick={handleClick}
            />
        )
    }
    return SeatComponent;
}

export default withLiveEventSeatLogic;