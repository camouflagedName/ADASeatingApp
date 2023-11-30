import { Box, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Center, MenuButton, MenuList, MenuItem, Menu, Text, Card, CardBody, CardHeader, Heading, Badge, useDisclosure, Stack, StackDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { IAppData, IPatronData, ISeat } from "../interfaces/interfaces"
import { useContext, useEffect, useState } from "react"
import { patronsSeedData } from "../seedData/patrons"
import { DataContext, LiveEventContext } from "../context/context"
import SeatNotesModal from "./SeatNotesModal"
import { IAppLiveEventData } from "../interfaces/liveEventInterfaces"

const MapNavAccordion = ({ seatInfo, handleModal, handleUpdate }:
    { seatInfo: ISeat, handleModal: (param: ISeat) => void, handleUpdate: (arg1: ISeat, arg2: IPatronData) => void }) => {
    const isAvailable = seatInfo.available;
    const { patronDataMap } = useContext(DataContext) as IAppData;
    const { seatDataMap } = useContext(LiveEventContext) as IAppLiveEventData;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [thisPatronData, setThisPatronData] = useState<IPatronData>({
        _id: "",
        eventID: "",
        fullName: "",
        callAhead: false,
        numberRequested: 0,
        arrived: false,
        notes: [],
        seatID: [],
    })

    const handleNotesBtnClick = () => {
        onOpen();
    }

    const handleClose = (modalData: string[]) => {
        setThisPatronData(prev => ({ ...prev, notes: modalData }))
    }

    const handleAssignToClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        let patronObj = {};
        const value = evt.currentTarget.textContent || "";
        const callAhead = value !== 'Walk-Up';
        patronObj = { fullName: value, callAhead: callAhead }
        Object.assign(patronObj, { _id: evt.currentTarget.value })

        setThisPatronData({ ...thisPatronData, ...patronObj });
    }

    const handleSeatNumberClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const valueString = evt.currentTarget.textContent || "";
        const value = Number(valueString);

        setThisPatronData(prev => ({ ...prev, numberRequested: value }));
    }


    useEffect(() => {
        if (!isAvailable) {
            const patronID = seatInfo.assignedTo;
            const patronData = patronDataMap.get(patronID) as IPatronData
            setThisPatronData(patronData)
        }
    }, [isAvailable, seatInfo, patronDataMap])

    return (
        <>
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
                            <SimpleGrid columns={1} row={6} spacing={5} marginBottom={5}>
                                {
                                    isAvailable ?
                                        <>
                                            <Box>
                                                <Center>- Seat is AVAILABLE -</Center>
                                            </Box>
                                            <Menu>
                                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                    {thisPatronData.fullName.length > 0 ? `Assigned to ${thisPatronData.fullName}` : 'Assign to:'}</MenuButton>
                                                <MenuList >
                                                    <MenuItem value='walk-up' onClick={handleAssignToClick}>Walk-Up</MenuItem>
                                                    {patronsSeedData.map(patronData => <MenuItem key={patronData._id} value={patronData._id} onClick={handleAssignToClick}>{patronData.fullName}</MenuItem>)}

                                                </MenuList>
                                            </Menu>
                                            <Menu>
                                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                    {thisPatronData.numberRequested > 0 ? `${thisPatronData.numberRequested} seats selected` : 'Number of Seats'}
                                                </MenuButton>
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
                                                    <Button onClick={handleNotesBtnClick}>Add Notes</Button>
                                                </Center>
                                            </Box>
                                            <Center>
                                                <Button marginBottom={5} onClick={() => handleUpdate(seatInfo, thisPatronData)}>Update Seat Data</Button>
                                            </Center>
                                            <Center>
                                                <Button onClick={() => handleModal(seatInfo)} isDisabled>EDIT SEAT DATA</Button>
                                            </Center>
                                        </>
                                        :
                                        <>
                                            <Card variant="elevated">
                                                <CardHeader>
                                                    <Heading size='md'><Center>Seat Assignment</Center></Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Stack divider={<StackDivider />} spacing='4'>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Patron
                                                            </Heading>
                                                            <Text pt='2' fontSize='sm'>
                                                                {thisPatronData.fullName}
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Seats
                                                            </Heading>

                                                            {
                                                                thisPatronData.seatID.map(id => {
                                                                    const seatData = seatDataMap.get(id) as ISeat;
                                                                    return (
                                                                        <>
                                                                            <Text key={id} pt='2' fontSize='sm'>{`${seatData.section.split(/(?=[A-Z])/).join(" ")}, Row ${seatData.row}, #${seatData.seatNumber}`}</Text>
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </Box>
                                                        <Box>
                                                            <Heading size='xs' textTransform='uppercase'>
                                                                Notes
                                                            </Heading>
                                                            {thisPatronData.notes.map(note => (
                                                                <Box>
                                                                    <Badge key={note}>{note}</Badge>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        </>
                                }
                            </SimpleGrid>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <SeatNotesModal isOpen={isOpen} onClose={onClose} handleClose={handleClose} />
        </>
    )
}

export default MapNavAccordion;