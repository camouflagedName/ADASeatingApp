import { /* useState ,*/ useEffect } from "react";
import Seats from "./SeatsSVG";
//import ZoomedMap from "./ZoomedMap";
import { Center, Flex } from "@chakra-ui/react";
import { ISeat } from "../../utils/interfaces";


const MapSVG = ({ update }: { update: (param: ISeat)=> void}) => {
/*     const [mapDimensions, setMapDimensions] = useState({
        width: 1024,
        height: 768
    });
    const [isZoomedIn, setIsZoomedIn] = useState(true);

    const handleClick = () => {
        //setIsZoomedIn(!isZoomedIn);
    }
 */

    const mapDimensions = {
        width: 1024,
        height: 768
    }

    const isZoomedIn = true;

    useEffect(() => {
        /*
        if (isZoomedIn) {
            setMapDimensions({
                width: 1024 * 2,
                height: 768 * 2
            })
        } else {
            setMapDimensions({
                width: 1024,
                height: 768
            })
        }
        */
    }, [isZoomedIn])

    return (
        <Flex style={{ background: "rgb(232, 236, 242)", justifyContent: "center" }}>
            <Center style={{ }}>
                <svg version="1.1" viewBox="0 0 10240 7680" x="0px" y="0px" width={`${mapDimensions.width.toString()}px`} style={{ maxWidth: "100%", minWidth: "100%", minHeight: "100%", maxHeight: "100%" }} xmlns="http://www.w3.org/2000/svg">
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
                    <g id="BACKGROUND">
                        <path d="M1027.3,2595.3999999999996L2305.05,124.2L3649.6000000000004,124.2L6974.650000000001,448.7L8613.050808625338,1990.000808625337L9210.100808625337,2895.8008086253367L9210.850808625337,4784.400808625337L8613.250808625337,5690.750808625337L6974.650000000001,7232.349999999999L3649.6000000000004,7556.849999999999L2305.05,7556.849999999999L1027.3,5070.15z" id="POCHE" fill="#f6f6f6" stroke="#d4d4d4" strokeWidth="3" />
                        <path d="M1227.4,2795.25L2461.202296259904,2795.25L2461.202296259904,4870.215402848381L1227.4,4870.215402848381z" id="STAGE" fill="#262626" strokeWidth="10" />
                        <text fontFamily="averta,arial,'arial bold'" text-align="center" fontSize="440" transform="rotate(-90, 1585.4526558563969, 4599.006926091544)" x="2356.1" y="5006" width="1532.5" height="508.85" fill="#ffffff" strokeWidth="10">
                            <tspan textAnchor="middle" x="2356.1">STAGE</tspan>
                        </text>
                        
                        {/* MAIN FLOOR */}
                        <path d="M3005.46241200893,2675 L3005.4,5058.76241200893 L3149.8624120089303,5308.81241200893 L5281.400000000001,5308.8 L5281.400000000001,2400 L4132.349999999999,2400 L3149.8624120089303,2400z" id="RT1FM" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>

                        { /* TIER A */}
                        <path d="M5560.9,4230.15L5560.9,5157.519263474873L6333.396730540437,5157.519263474873L6333.396730540437,4453.548963922594L6102.3007883244145,4453.548963922594L6102.3007883244145,4230.15z" id="TIERAL" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                        <path d="M5560.9,2523.4L5560.9,3450.769263474873L6102.3007883244145,3450.769263474873L6102.3007883244145,3212.1162880253028L6333.396730540437,3212.1162880253028L6333.396730540437,2523.4z" id="TIERAR" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                        
                        <g id="LEVEL 2">
                            <path d="M2505.35,1153.6L2505.3686593413177,2177.6806295229662L3127.928252725772,2062.7857353610643L3304.1377424566563,1518.5393974857454L3388.3753388340674,1545.819354491787L3237.3559598816746,2012.2748984148573L3718.6923285053736,2168.117717097798L3994.1788437154946,1892.9484106900725L4087.839407458193,1603.6726422463914L4172.347564284706,1631.0458959590198L4024.220383236511,2088.591604403031L4505.55675186021,2244.4344230859715L4781.04326707033,1969.2651166782457L4876.103281411835,1675.679040390245L4961.675020693439,1703.388162246587L4811.084806591349,2168.5002335948043L5292.421175215046,2324.3337226070857L5567.907690425168,2049.1737458700195L5665.309452102005,1748.3571748215254L5749.099224287798,1775.4878570970277L5597.949229946185,2242.3445768584224L6079.2855985698825,2398.1873955413625L6257.193088360651,2220.4851585050856L6499.242063929988,2587.5144022183804L6499.242063929988,5093.31466641491L6257.193088360651,5460.334580457546L6079.2855985698825,5282.641673091928L5597.949229946185,5438.4751621042105L5749.099224287798,5905.331881865604L5665.309452102005,5932.462564141108L5567.907690425168,5631.645993092612L5292.421175215046,5356.504675696864L4811.084806591349,5512.319505367826L4961.675020693439,5977.431576716046L4876.103281411835,6005.140698572386L4781.04326707033,5711.554622284386L4505.55675186021,5436.39464554732L4024.220383236511,5592.2281345596L4172.347564284706,6049.773843003612L4087.839407458193,6077.14709671624L3994.1788437154946,5787.87132827256L3718.6923285053736,5512.711351535492L3237.3559598816746,5668.544840547775L3388.3753388340674,6135.000384470844L3304.1377424566563,6162.280341476886L3127.928252725772,5618.043333272226L2505.3686593413177,5503.139109439666L2505.35,6527.238398303949L3640.0618641938418,6527.173090609338L7320.131796177107,6167.990099920011L7825.398770040372,5401.41771024785L7825.398770040372,2274.699874702797L7316.1666861471585,1512.4471225456136L3640.0618641938418,1153.6653076946106L2505.35,1153.6z" id="LEVEL 2 TRAY" fill="#d1d1d1" stroke="#dddddd" strokeWidth="10" filter="url(#ISM_Shadow)" />
                            <path d="M7367.75,2696.5L7367.75,3839.8L7825.27,3839.8L7825.27,2696.5z" id="TCRCT" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                            <path d="M7367.54537507307,4929.8L7367.77,5244.373124634648L7205.8,5490.003124634648L7597.41,5748.223124634648L7825.290000000001,5402.643124634648L7825.145375073071,4929.85z" id="TRCLFT" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                            <path d="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z" id="TRCRHT" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                            <path d="M7367.75,3840.8L7367.89537507307,4929.645375073071L7825.0953750730705,4929.645375073071L7825.27,3840.8z" id="TRCLCR" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                            <path d="M7597.4,1932.35L7205.8,2190.5899999999997L7367.77,2436.2L7367.77,2695.5L7825.290000000001,2695.5L7825.290000000001,2277.91L7597.4,1932.35z" id="TRCRHT" fill="#ffffff" stroke="#dddddd" strokeWidth="10"/>
                            <path d="M5805.1339963177725,1602.45L5597.95,2242.372110480297L6079.286368623699,2398.1869401512618L6354.782213504478,2123.0549524261705L6501.230053834107,1670.7245298803734L5805.1339963177725,1602.45z" id="2FBX4" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5019.328919431546,1525.4L4811.1,2168.540846857549L5292.436368623698,2324.355676528513L5567.932213504479,2049.223688803422L5715.424976947881,1593.6652002097148L5019.328919431546,1525.4z" id="2FBX3" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M4231.570589730946,1448.1L4024.2,2088.5912203904777L4505.536368623698,2244.406050061442L4781.032213504479,1969.274062336351L4927.666647247281,1516.374529880373L4231.570589730946,1448.1z" id="2FBX2" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M3444.9911501800484,1371L3237.35,2012.3122314084435L3718.6863686236984,2168.1270610794077L3994.1822135044786,1892.9950733543171L4141.077878025724,1439.2652002097147L3444.9911501800484,1371z" id="2FBX1" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5805.1339963177725,6078.386940151261L5597.95,5438.464829670965L6079.286368623699,5282.65L6354.782213504478,5557.78198772509L6501.230053834107,6010.112410270887L5805.1339963177725,6078.386940151261z" id="2FBX8" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M4231.570589730946,6232.706050061442L4024.2,5592.214829670964L4505.536368623698,5436.4L4781.032213504479,5711.5319877250895L4927.666647247281,6164.431520181068L4231.570589730946,6232.706050061442z" id="2FBX6" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5019.328919431546,6155.455676528513L4811.1,5512.314829670964L5292.436368623698,5356.5L5567.932213504479,5631.63198772509L5715.424976947881,6087.190476318799L5019.328919431546,6155.455676528513z" id="2FBX7" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M3444.9911501800484,6309.827061079407L3237.35,5668.514829670963L3718.6863686236984,5512.7L3994.1822135044786,5787.83198772509L4141.077878025724,6241.561860869693L3444.9911501800484,6309.827061079407z" id="2FBX5" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M6433.57,5191.85L6278.9,5425.590000000001L6433.473222389495,5530.973222389495L6589.623222389495,5294.2732223894955z" id="2FLTWG" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M6498.55,4437L6498.55,5093.67L6434.13,5191.02L6685.58,5356.92L6797.400000000001,5187.42L7253.13,5187.42L7253.13,4437z" id="TIERBL" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M6499.2,3229.35L6499.2,4435.950000000001L7253.78,4435.950000000001L7253.78,3229.35z" id="TIERBC" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M6681.8,2316.63L6430.97,2481.9700000000003L6498.79,2584.7799999999997L6498.79,3227.89L7253.37,3227.89L7253.37,2477.67L6788.83,2477.67L6681.8,2316.63z" id="TIERBR" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M6433.55,2140.05L6274,2245.3232223894956L6430.336777610506,2481.1067776105047L6589.599999999999,2376.75z" id="2FRTWG" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            
                        </g>
                        <g id="LEVEL 3">
                            <path d="M8556.933494614783,2267.469697610476L8250.923222389496,2472.6232223894954L8082.373222389495,2213L7918,2317.15L8344.947746202519,2970.554826202548L8345.062617610447,4709.754826202548L7918.123222389495,5360.123222389495L8077.423222389495,5465.173222389495L8247.873222389495,5205.173222389495L8557.071483421967,5412.819697610477L9011.021483421966,4724.469697610477L9010.683494614785,2955.675703206883z" id="LEVEL 3 TRAY" fill="#dfdfdf" strokeWidth="10" filter="url(#ISM_Shadow)" />
                            <path d="M2505.35,7356.887395541364L2505.3686593413177,6332.78810667708L3127.946912067089,6447.683000838982L3304.156401797974,6991.929338714301L3388.3939981753847,6964.649381708259L3237.374619222993,6498.193837785188L3718.710987846691,6342.369678443564L3994.197503056812,6617.520325509974L4087.85806679951,6906.796093953655L4172.366223626023,6879.422840241026L4024.239042577829,6421.877131797015L4505.5754112015275,6266.052972455392L4781.0619264116485,6541.2036195218L4876.121940753152,6834.789695809801L4961.693680034758,6807.080573953458L4811.103465932665,6341.968502605242L5292.439834556364,6186.153672934278L5567.926349766485,6461.294990330027L5665.328111443323,6762.1115613785205L5749.1178836291165,6734.980879103019L5597.967889287502,6268.1241593416225L6079.304257911201,6112.3L6354.828091803956,6387.1987459586235L6420.257072133425,6589.661928923093L6541.440164319292,6564.387851108671L6705.847620666922,7057.600890480897L3640.080523535159,7356.822087846752L2505.35,7356.887395541364z" id="LEVEL 3 TRAY" fill="#d1d1d1" stroke="#dddddd" strokeWidth="10" filter="url(#ISM_Shadow)" />
                            <path d="M2505.35,324.05L2505.3686593413177,1348.1492888642836L3127.946912067089,1233.2543947023817L3304.156401797974,689.0080568270629L3388.3939981753847,716.2880138331045L3237.374619222993,1182.7435577561748L3718.710987846691,1338.567717097798L3994.197503056812,1063.4170700313898L4087.85806679951,774.141301587709L4172.366223626023,801.5145553003374L4024.239042577829,1259.0602637443485L4505.5754112015275,1414.884423085971L4781.0619264116485,1139.7337760195635L4876.121940753152,846.1476997315626L4961.693680034758,873.8568215879045L4811.103465932665,1338.968892936122L5292.439834556364,1494.783722607086L5567.926349766485,1219.642405211337L5665.328111443323,918.825834162843L5749.1178836291165,945.956516438345L5597.967889287502,1412.8132361997398L6079.304257911201,1568.6373955413626L6354.828091803956,1293.7386495827398L6420.257072133425,1091.275466618271L6541.440164319292,1116.5495444326918L6705.847620666922,623.3365050604672L3640.080523535159,324.1153076946109L2505.35,324.05z" id="LEVEL 3 TRAY" fill="#d1d1d1" stroke="#dddddd" strokeWidth="10" filter="url(#ISM_Shadow)" />
                            <path d="M8088.273222389496,5099.75L7918.05,5360L8077.373222389496,5465.1L8247.923222389496,5205.073222389496z" id="3FLWG" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M8344.91,4165.55L8345.15,4709.84L8088.259999999999,5099.79L8557.41,5412.4400000000005L9011.05,4724.61L9011.09,4165.55z" id="TRDLFT" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M8345.15,3500.7L8345.15,4164.6L9011.329999999998,4164.6L9011.329999999998,3500.7z" id="TRDCTR" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M8557.133888052529,2267.95L8089.35,2578.823222389495L8344.80388805253,2970.54L8344.833888052528,3499.49L9011.013888052525,3499.49L9010.80388805253,2955.56z" id="TRDRHT" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M8082.35,2213.05L7918,2317.1232223894954L8089.373222389495,2578.9232223894955L8250.923222389496,2472.5732223894956z" id="3FRTWG" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5805.1339963177725,6907.986940151262L5597.95,6268.064829670964L6079.286368623699,6112.25L6354.782213504478,6387.381987725092L6501.230053834107,6839.7124102708885L5805.1339963177725,6907.986940151262z" id="3FBX16" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M3444.9911501800484,7139.427061079407L3237.35,6498.114829670964L3718.6863686236984,6342.3L3994.1822135044786,6617.43198772509L4141.077878025724,7071.161860869693L3444.9911501800484,7139.427061079407z" id="3FBX13" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M4231.570589730945,7062.356050061442L4024.2,6421.864829670964L4505.536368623698,6266.05L4781.032213504479,6541.18198772509L4927.666647247281,6994.081520181067L4231.570589730945,7062.356050061442z" id="3FBX14" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5019.328919431546,6985.055676528513L4811.1,6341.914829670964L5292.436368623698,6186.1L5567.932213504479,6461.23198772509L5715.424976947881,6916.790476318798L5019.328919431546,6985.055676528513z" id="3FBX15" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5805.1339963177725,772.9L5597.95,1412.822110480297L6079.286368623699,1568.6369401512611L6354.782213504478,1293.5049524261708L6501.230053834107,841.1745298803735L5805.1339963177725,772.9z" id="3FBX12" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M5019.328919431546,695.75L4811.1,1338.8908468575487L5292.436368623698,1494.7056765285124L5567.932213504479,1219.5736888034223L5715.424976947881,764.0152002097149L5019.328919431546,695.75z" id="3FBX11" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M4231.570589730945,618.5L4024.2,1258.991220390477L4505.536368623698,1414.8060500614415L4781.032213504479,1139.6740623363512L4927.666647247281,686.7745298803732L4231.570589730945,618.5z" id="3FBX10" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                            <path d="M3444.9911501800484,541.35L3237.35,1182.662231408443L3718.6863686236984,1338.4770610794071L3994.1822135044786,1063.3450733543168L4141.077878025724,609.6152002097148L3444.9911501800484,541.35z" id="3FBX9" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />
                        </g>
                        <g id="DETAILS TOP">
                            <g>
                                <polyline points="8017.844339622643,5449.2 8017.745956873317,6637.2508086253365 6678.4,6638.0008086253365 " fill="none" stroke="#727272" strokeWidth="10" />
                                <path d="M6678.303121224228,6590.000855349288L6595.218043280396,6638.101388434354L6678.426878786747,6686.000801099615z" fill="#727272" />
                            </g>
                            <g>
                                <polyline points="2461.203556994629,6378.100000708044 2286.5,6378.064933908008 2286.535066800035,5509.65 2391.185066800035,5509.714933908008 " fill="none" stroke="#727272" strokeWidth="10" />
                                <path d="M2391.2252834422275,5557.714968101972L2474.367084293624,5509.712547213158L2391.2148501443676,5461.7149431480875z" fill="#727272" />
                            </g>
                            <g>
                                <polyline points="2461.203556994629,1299.7 2286.5,1299.7350668000352 2286.535066800035,2168.1500007080435 2391.185066800035,2168.0850668000353 " fill="none" stroke="#727272" strokeWidth="10" />
                                <path d="M2391.2848501308927,2216.0850141259116L2474.367017281099,2167.979453515675L2391.155283455703,2120.0850760401154z" fill="#727272" />
                            </g>
                            <g>
                                <polyline points="8017.844339622643,2207.9943396226413 8017.745956873317,1049.3459568733151 6678.4,1049.25 " fill="none" stroke="#727272" strokeWidth="10" />
                                <path d="M6678.333438939822,1001.2499951080704L6595.217996344677,1049.2980404607486L6678.396561060356,1097.2499998768094z" fill="#727272" />
                            </g>
                            <path d="M5600.7,3590.7L6084.90989011508,3590.7L6084.90989011508,4074.909901138946L5600.7,4074.909901138946z" id="MIX" fill="#d1d1d1" strokeWidth="10" />
                            <text fontFamily="averta,arial,'arial bold'" text-align="center" fontSize="200" x="5842.8" y="3902.15" width="363.4" height="231.3" fill="#727272" strokeWidth="10">
                                <tspan textAnchor="middle" x="5842.8">MIX</tspan>
                            </text>
                        </g>
                    </g>
                    {
                        isZoomedIn ? <Seats update={update} /> : null
                    }

                </svg>
            </Center>
        </Flex>
    )
}

export default MapSVG;

//<path onClick={handleClick} d="M5560.9,2523.4L5560.9,3450.769263474873L6102.3007883244145,3450.769263474873L6102.3007883244145,3212.1162880253028L6333.396730540437,3212.1162880253028L6333.396730540437,2523.4zM5560.9,4230.15L5560.9,5157.519263474873L6333.396730540437,5157.519263474873L6333.396730540437,4453.548963922594L6102.3007883244145,4453.548963922594L6102.3007883244145,4230.15zM7597.396,1932.345L7205.795,2190.574L7367.77,2436.2L7367.77,5244.37L7205.795,5489.996L7597.406,5748.215L7825.29,5402.64L7825.29,2277.91L7597.396,1932.345zM4131.6,2356.25L3149.857,2356.26L3005.46,2606.2580000000003L3005.46,5058.752L3149.857,5308.8099999999995L5281.4,5308.8L5281.4,2356.25L4131.6,2356.25z" id="GA1" fill="#ffffff" stroke="#dddddd" strokeWidth="10" />