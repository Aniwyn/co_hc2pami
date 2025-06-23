import { DialogBody, DialogHeader, Typography } from "@material-tailwind/react"

const MedicalHistory = ({ patient }) => {
    console.log(patient)
    return (
        <>
            <DialogHeader>Historia clínica</DialogHeader>
            <DialogBody className="overflow-scroll">
                <p><strong className="font-bold">N° ficha: </strong>{patient.id_pacient && ` ${patient.id_pacient}`}</p>
                <p><strong className="font-bold">DNI: </strong>{patient.dni && ` ${patient.dni}`}</p>
                <p><strong className="font-bold">Nombre: </strong>{` ${patient.last_name}, ${patient.first_name}`}</p>
                {patient.events &&
                    patient.events.map(event =>
                        <>
                            <div className="border-t-4 rounded-xl border-teal-500 border-dotted mt-2"></div>
                            <div className="flex flex-row content-between gap-4">
                                <p><strong className="font-bold">Fecha: </strong>{` ${event.date}`}</p>
                                <p><strong className="font-bold">Hora: </strong>{` ${event.time}`}</p>
                            </div>
                            <p><strong className="font-bold">Medico: </strong>{` ${event.medic}`}</p>
                            <div className="pl-8 pt-2">
                                {event.observations.split("\n").map((line, idx) => (
                                    <p key={idx} className="leading-5">{line}</p>
                                ))}
                            </div>
                        </>
                    )
                }
            </DialogBody>
        </>
    )
}

export default MedicalHistory