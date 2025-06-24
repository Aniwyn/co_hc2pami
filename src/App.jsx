import { useState, useRef } from "react"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    List,
    ListItem,
    Typography,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react"
import {
    UserIcon,
    DocumentIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline"
import { format } from "date-fns"
import html2pdf from "html2pdf.js"
import Rec from "./assets/receta_pami.png"
import DataPicker from "./components/DataPicker.jsx"
import usePatients from "./hooks/usePatients.js"
import MedicalHistory from "./components/MedicalHistory.jsx"

export default function App() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [date, setDate] = useState(new Date())
    const [indexFO, setIndexFO] = useState("")
    const [indexBMC, setIndexBMC] = useState("")
    const [indexRF, setIndexRF] = useState("OD ()   -   OI ()")
    const [indexAV, setIndexAV] = useState("OD ()/10   -   OI ()/10")
    const [indexPIO, setIndexPIO] = useState("OD ()   -   OI ()")
    const [observations, setObservations] = useState("")
    
    const [medic, setMedic] = useState({})
    const [results, setResults] = useState([])
    const [selectedPatient, setSelectedPatient] = useState({})
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const { data, loading } = usePatients()
    const [printStyle, setPrintStyle] = useState({})

    const handleLastName = (e) => setLastName(e.target.value)
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleIndexFO = (e) => setIndexFO(e.target.value)
    const handleIndexBMC = (e) => setIndexBMC(e.target.value)
    const handleIndexRF = (e) => setIndexRF(e.target.value)
    const handleIndexAV = (e) => setIndexAV(e.target.value)
    const handleIndexPIO = (e) => setIndexPIO(e.target.value)
    const handleObservations = (e) => setObservations(e.target.value)
    const handleMedic = (e) => {
        const selectedMedic = STAMPS.find((stamp) => stamp.name === e)
        if (selectedMedic) setMedic(selectedMedic)
    }
    const handleOpen = () => setOpen(!open)
    const handleOpen2 = () => {
        setOpen2(!open2)
        setSelectedPatient({})
    }

    const contentRef = useRef(null);

    const STAMPS = [
        {
            ID: "ASE",
            name: "Dra. Veronica Ase",
            prof: "Médica cirujana",
            esp: "Esp. Oftalmología",
            mp: "M.P. 3831",
        },
        {
            ID: "ALCOBA",
            name: "Dr. Emilio E. Alcoba",
            prof: "Médico Especialista",
            esp: "En Oftalmología",
            mp: "M.P. 3971 - M.N. 153821",
        },
        {
            ID: "SIUFIE",
            name: "Dr. Ernesto Siufi",
            prof: "Médico cirujano",
            esp: "Esp. Oftalmología",
            mp: "M.P. 1398",
        },
        {
            ID: "SIUFIL",
            name: "Dr. Lucas Siufi",
            prof: "Médico cirujano",
            esp: "Esp. Oftalmología",
            mp: "M.P. 3280",
        },
        {
            ID: "ZARIFJ",
            name: "Dr. Jose Luis Zarif",
            prof: "Médico cirujano",
            esp: "Esp. Oftalmología",
            mp: "M.P. 2010",
        },
        {
            ID: "ZARIFA",
            name: "Dra. Agustina A. Zarif",
            prof: "Médica cirujana",
            esp: "Esp. Oftalmología",
            mp: "M.P. 4035",
        },
        {
            ID: "MAITE",
            name: "Dra. Maite Dipierri",
            prof: "Médica cirujana",
            esp: "Esp. Oftalmología",
            mp: "M.P. 4124",
        },
        {
            ID: "TONELLI",
            name: "Dra. Tonelli Mariela S.",
            prof: "Médica cirujana",
            esp: "Esp. Oftalmología",
            mp: "M.P. 3328",
        },
        {
            ID: "ABUD",
            name: "Dra. Valeria S. Abud",
            prof: "Médica",
            esp: "M.P. 4156",
            mp: "",
        },
        {
            ID: "JURE",
            name: "Dr. Fancisco J. Jure",
            prof: "Médico cirujano",
            esp: "Esp. Oftalmología",
            mp: "M.P. 2883",
        },
        {
            ID: "VALDEZ",
            name: "Dra. Laura B. Valdez",
            prof: "Médica",
            esp: "M.P. 4505",
            mp: "",
        }
    ]

    const cleanForm = () => {
        setPrintStyle({ transform: "translateY(0px)" })
        setLastName("")
        setFirstName("")
        setIndexFO("")
        setIndexBMC("")
        setIndexRF("OD ()   -   OI ()")
        setIndexAV("OD ()/10   -   OI ()/10")
        setIndexPIO("OD ()   -   OI ()")
        setObservations("")
        setMedic({})
    }

    const handleSearchHC = () => {
        const q = lastName.trim().toLowerCase()

        if (q === "") {
            setResults([])
            return
        }

        const filtered = data.filter(p =>
            p.last_name.toLowerCase().includes(q)
        )

        setResults(filtered)
        console.log(filtered)

        setOpen(true)
    }

    const handleShowHC = (patient) => {
        setSelectedPatient(patient)
        setOpen(false)
        setOpen2(true)
    }

    const handlePrint = () => {
        setPrintStyle({ transform: "translateY(-5px)" })
        const element = contentRef.current
        const opt = {
            margin: 0,
            filename: `HC_${lastName}_${firstName}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 4, useCORS: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a6', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] }
        }

        html2pdf().set(opt).from(element).save()
    }

    if (loading) return <p>Cargando...</p>

    return (
        <>
            <Card className="h-screen w-screen flex flex-row box-content " shadow={false} >
                <div className="flex justify-center items-center w-1/2 py-4 fixed" id="preview-content">
                    <div className="relative print-content w-[559px] h-[555px] overflow-hidden mx-auto my-auto" ref={contentRef} id="preview">
                        <div className="flex" style={printStyle}>
                            <p className="absolute top-[88px] left-[85px] w-[285px] text-center text-sm">{lastName ? `${lastName}, ${firstName}` : ""}</p>
                            <p className="absolute top-[108px] left-[70px] w-[110px] text-center text-sm">{date ? format(date, "dd / MM / yyyy") : ""}</p>
                            <div className="absolute top-[158px] left-[120px] w-[250px] h-[2rem] content-center">
                                <p className="text-center text-xs leading-none">{`${indexFO}`}</p>
                            </div>
                            <div className="absolute top-[202px] left-[120px] w-[250px] h-[2rem] content-center">
                                <p className="text-center text-xs leading-none">{`${indexBMC}`}</p>
                            </div>
                            <div className="absolute top-[246px] left-[120px] w-[250px] h-[2rem] content-center">
                                <p className="text-center text-xs leading-none">{`${indexRF.replace(/[()]/g, "")}`}</p>
                            </div>
                            <div className="absolute top-[290px] left-[120px] w-[250px] h-[2rem] content-center">
                                <p className="text-center text-xs leading-none">{`${indexAV.replace(/[()]/g, "")}`}</p>
                            </div>
                            <div className="absolute top-[334px] left-[120px] w-[250px] h-[2rem] content-center">
                                <p className="text-center text-xs leading-none">{`${indexPIO.replace(/[()]/g, "")}`}</p>
                            </div>
                            <div className="absolute top-[415px] left-[25px] w-[190px] h-[6rem]">
                                <p className="text-xs leading-none">{`${observations}`}</p>
                            </div>
                            <div className="absolute top-[445px] left-[192px] w-[200px] flex flex-col items-center justify-center leading-[0.9]">
                                <p className="!leading-[0.9] text-sm font-bold">{medic.name}</p>
                                <p className="!leading-[0.9] text-xs font-light">{medic.prof}</p>
                                <p className="!leading-[0.9] text-xs font-light">{medic.esp}</p>
                                <p className="!leading-[0.9] text-xs font-light">{medic.mp}</p>
                                <img
                                    id="imgStamp"
                                    className="absolute top-[-100px] w-[150px] object-cover object-center"
                                    src={medic ? `/stamps/${medic.ID}.png` : ""}
                                    alt=""
                                />
                            </div>
                        </div>
                        <img
                            id="imgPrint"
                            className="w-[400px] object-cover object-center shadow-lg BORRARtranslate-y-[2px] index-0"
                            src={Rec}
                            alt="imagen de receta"
                        />
                    </div>
                </div>
                <div className="ml-auto w-1/2 m-6">
                    <Card>
                        <CardHeader
                            color="green"
                            floated={false}
                            shadow={false}
                            className="m-0 grid place-items-center px-4 py-1 text-center"
                        >
                            <Typography variant="h3" color="white">
                                PAMI
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <form className="flex flex-col gap-2">
                                <div className="mt-2 flex gap-4">
                                    <Input
                                        label="Apellido"
                                        placeholder="Perez"
                                        variant="static"
                                        value={lastName}
                                        onChange={handleLastName}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<IdentificationIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                    <Input
                                        label="Nombre"
                                        placeholder="Juan"
                                        variant="static"
                                        value={firstName}
                                        onChange={handleFirstName}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<DocumentIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                </div>
                                <div className="mt-2 flex gap-4 justify-between">
                                    <div className="w-1/2 pr-2">
                                        <DataPicker date={date} setDate={setDate} />
                                    </div>
                                    <div>
                                        <Button className="ms-4" onClick={handleSearchHC} disabled={!lastName}>HC</Button>
                                        <Button className="ms-4" variant="outlined" color="red" onClick={cleanForm}>Limpiar</Button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Input
                                        label="Fondo de ojos"
                                        placeholder="Retinopatía diabética, glaucoma, degeneración macular, etc."
                                        variant="static"
                                        value={indexFO}
                                        onChange={handleIndexFO}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<UserIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Input
                                        label="Biomicroscopía"
                                        placeholder="Pseudofaquia"
                                        variant="static"
                                        value={indexBMC}
                                        onChange={handleIndexBMC}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<UserIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Input
                                        label="Refractometría"
                                        placeholder="OD -5,50 +2,75 X 83º / OI +4,00 +0,25 X 175º"
                                        variant="static"
                                        value={indexRF}
                                        onChange={handleIndexRF}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<UserIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                </div>
                                <div className="mt-2 flex gap-4">
                                    <Input
                                        label="Agudeza visual"
                                        placeholder="OD 6/10  /  OI -/10"
                                        variant="static"
                                        value={indexAV}
                                        onChange={handleIndexAV}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<UserIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                    <Input
                                        label="Presión intraocular"
                                        placeholder="OD 13 / OI 10"
                                        variant="static"
                                        value={indexPIO}
                                        onChange={handleIndexPIO}
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                        icon={<UserIcon className="h-4 w-4 text-gray-500" />}
                                    />
                                </div>
                                <div className="flex flex-row mt-2">
                                    <Textarea
                                        label="Observaciones"
                                        placeholder="..."
                                        variant="static"
                                        value={observations}
                                        onChange={handleObservations}
                                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 min-h-full"
                                        rows={2}
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div className="mt-2">
                                    <Select
                                        variant="static"
                                        label="Médico"
                                        placeholder="Dr. Jose Luis Zarif"
                                        onChange={handleMedic}
                                    >
                                        {STAMPS.map((stamp) => (
                                            <Option key={stamp.ID} value={stamp.name}>
                                                {stamp.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <Button className="mt-4" size="lg" onClick={handlePrint}>
                                    Imprimir receta
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </Card>
            <Dialog open={open} handler={handleOpen} className="h-96 overflow-y-scroll">
                <DialogHeader>Pacientes</DialogHeader>
                <DialogBody>
                    <List>
                        {
                            results.map(patient => {
                                return <ListItem key={patient.id_pacient} onClick={() => handleShowHC(patient)}>{`${patient.last_name}, ${patient.first_name}`}</ListItem>
                            })
                        }
                    </List>
                </DialogBody>
            </Dialog>
            <Dialog open={open2} handler={handleOpen2} className="h-96 overflow-y-scroll">
                {selectedPatient ?
                    <MedicalHistory patient={selectedPatient}/>
                : <></>}
            </Dialog>
        </>
    )
}
