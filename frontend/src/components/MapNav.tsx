import { Box, Flex, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Center, MenuButton, MenuList, MenuItem, Menu, useDisclosure, Text } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { IAppData, IPatronData, ISeat } from "../interfaces/interfaces";
import SeatNotesModal from "./SeatNotesModal";
import { useContext, useState } from "react";
import { DataContext } from "../context/context";

const MapNav = ({ seatData, handleModal, updateSidebar, navTitle }: { seatData: ISeat[], handleModal: (param: ISeat) => void, updateSidebar: () => void, navTitle: string }) => {
    const [data, setData] = useState<IPatronData>({
        eventID: "",
        fullName: "",
        callAhead: false,
        numberRequested: 0,
        arrived: false,
        notes: [],
        seatID: [],
    })
    const { isOpen, onOpen, onClose } = useDisclosure();

    const contextData = useContext(DataContext);
    const { sortedSeatData } = contextData as IAppData;
    const { tierARowA, tierARowB, tierCLeft, tierCLeftCenter, tierCRight, tierCRightCenter, secondLeftWing, secondRightWing, thirdLeftWing, thirdRightWing } = sortedSeatData;

    const allSeatsSorted = [...tierARowA, ...tierARowB, ...tierCLeft, ...tierCLeftCenter, ...tierCRight, ...tierCRightCenter, ...secondLeftWing, ...secondRightWing, ...thirdLeftWing, ...thirdRightWing]

    const handleEditBtnClick = (data: ISeat) => {
        handleModal(data);
    }

    const handleNotesBtnClick = () => {
        onOpen();
    }

    const showAll = () => {
        updateSidebar();
    }

    /*
    const handleTextInput = (key: string, value: string) => {
        setTextInput({ ...textInput, [key]: value })
    }
    */

    const handleClose = (modalData: string[]) => {
        setData({ ...data, notes: modalData })
    }

    const handleAssignToClick = (evt: React.MouseEvent) => {
        const value = evt.currentTarget.textContent || "";
        const callAhead = value !== 'Walk-Up';
        setData({ ...data, fullName: value, callAhead: callAhead })
    }

    const handleSeatNumberClick = (evt: React.MouseEvent) => {
        const valueString = evt.currentTarget.textContent || "";
        const value = Number(valueString);
        setData({ ...data, numberRequested: value })
    }

    const handleSubmit = async (selectedSeatData: ISeat) => {

        const seatIDArr: string[] = [];
        const sortedFilteredSeatList = seatData.filter(seat => seat.section === selectedSeatData.section && seat.row === selectedSeatData.row).sort((a, b) => a.seatNumber - b.seatNumber)
        const selectedSeatArr = sortedFilteredSeatList.filter(seat => seat.seatNumber >= selectedSeatData.seatNumber && seat.seatNumber < selectedSeatData.seatNumber + data.numberRequested)

        selectedSeatArr.forEach(seat => {
            seatIDArr.push(seat._id)
        })

        const patronData: IPatronData = { ...data, seatID: seatIDArr, arrived: true }
        console.log(patronData)


        try {

            //const results = await addPatron(data);

        } catch (err) {
            console.log(err);
        }

        // TODO
        // check how many seats requested and fill in subsequent seats
        // color in seats that are now assigned

    }


    return (
        <>
            <Flex id="navContainer" direction="column" borderWidth="1px" borderRadius={"sm"} style={{ position: 'relative', height: "100%", overflow: 'auto' }}>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' color={'blue.600'} style={{ position: 'sticky', top: 0, width: "100%" }}>
                    <Center>{navTitle}</Center>
                </Box>
                <Box w='100%' p={4} borderWidth='1px' borderRadius='sm' fontWeight='bold' bg={'gray.100'} color={'blue.600'} style={{ position: 'sticky', top: 0, width: "100%" }}>
                    <SimpleGrid columns={3} spacing={10} >
                        <Box>SEC</Box>
                        <Box>ROW</Box>
                        <Box>NUM</Box>
                    </SimpleGrid>
                </Box>
                {
                    allSeatsSorted.map(seatInfo =>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box w='100%' p={4} >
                                        <SimpleGrid columns={3} spacing={5}>
                                            <Text style={{ display: "flex", margin: "auto" }}>{seatInfo.section.split(/(?=[A-Z])/).join(" ")}</Text>
                                            <Text style={{ display: "flex", margin: "auto" }}>{seatInfo.row}</Text>
                                            <Text style={{ display: "flex", margin: "auto" }}>{seatInfo.seatNumber}</Text>
                                        </SimpleGrid>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel >
                                    <Box w='100%' p={4} >
                                        <SimpleGrid columns={1} row={4} spacing={5} marginBottom={5}>
                                            {
                                                seatInfo.available ?
                                                    <>
                                                        <Box>
                                                            <Center>- Seat is AVAILABLE -</Center>
                                                        </Box>
                                                        <Menu>
                                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>{
                                                                data.fullName.length > 0 ? `Assigned to ${data.fullName}` : 'Assign to:'
                                                            }</MenuButton>
                                                            <MenuList >
                                                                <MenuItem value='walk-up' onClick={handleAssignToClick}>Walk-Up</MenuItem>
                                                                <MenuItem value='other' onClick={handleAssignToClick}>Other</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                        <Menu>
                                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>{
                                                                data.numberRequested > 0 ? `${data.numberRequested} seats selected` : 'Number of Seats'
                                                            }</MenuButton>
                                                            <MenuList >
                                                                <MenuItem value='1' onClick={handleSeatNumberClick}>1</MenuItem>
                                                                <MenuItem value='2' onClick={handleSeatNumberClick}>2</MenuItem>
                                                                <MenuItem value='3' onClick={handleSeatNumberClick}>3</MenuItem>
                                                                <MenuItem value='4' onClick={handleSeatNumberClick}>4</MenuItem>
                                                                <MenuItem value='5' onClick={handleSeatNumberClick}>5</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                        <Box>
                                                            <Center>
                                                                <Button onClick={() => handleNotesBtnClick()}>Add Notes</Button>
                                                            </Center>
                                                        </Box>
                                                    </>
                                                    :
                                                    <>
                                                        <Box>
                                                            <Center>- Seat is ASSIGNED -</Center>
                                                        </Box>
                                                        <Text>Assigned to: { }</Text>
                                                        <Button>Has arrived</Button>
                                                        <Text>NOTES</Text>
                                                    </>
                                            }

                                        </SimpleGrid>
                                        <Center>
                                            <Button marginBottom={5} onClick={() => handleSubmit(seatInfo)}>Submit Updated Data</Button>
                                        </Center>
                                        <Center>
                                            <Button onClick={() => handleEditBtnClick(seatInfo)}>EDIT SEAT DATA</Button>
                                        </Center>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    )
                }
                {
                    seatData.length === 1 ?
                        <Button onClick={showAll}>Show All Seats</Button> :
                        <></>
                }

            </Flex>
            <SeatNotesModal isOpen={isOpen} onClose={onClose} handleClose={handleClose} />
        </>
    )
}

export default MapNav;