import { useState } from "react";
import { Input } from "@material-tailwind/react";

const AutocompleteInput = ({ indications, setIndications, indicatonsName }) => {
  const options = [
    "305037 - OFT PAQUIMETRIA BILATERAL",
    "305033 - ECOMETRIA Y ECOGRAFIA BILATERAL x2",
    "305030 - TOPOGRAFIA CORNEAL BILATERAL",
    "300201 - CAMPIMETRIA COMPUTARIZADA",
    "300113 - RETINOFLUORESCEINOGRAFIA UNILATERAL",
    "20205 - ESCISION DE LESION DE PARPADOS, BLEFARECTOMIA (PIEL DE PARPADOS GLANDULA MEIBOMIANA, CHALAZIO SUTURA)",
    "20302 - ESCISION DE LESION CONJUNTIVA (QUISTE EPITELIOMA, NEVUS, PTERIGION)",
    "20305 - SUTURA DE CONJUNTIVA (Unilateral)",
    "20304 - CONJUNTIVOPLASTIA (INJERTO LIBRE DE CONJUNTIVA O MEMBRANA MUCOSA DEL LABIO)",
    "25044 - FOTOCOAGULACION C/LASER ARGON - 1 LADO (TRAT COMPL)",
    "25020 - CONJUNTIVOPLASTIA / INJERTO / FLAPPING / QUISTE / NEVUS / EPITELIOMA /PTERIGIUM /PANNUS ETC",
    "25029 - SUTURA DE CORNEA",
    "20901 - FOTOCOAGULACION CON YAG LASER: unilateral",
    "20501 - TRATAMIENTO QUIRURGICO DEL GLAUCOMA",
    "25056 - DACRIOCISTORRINOSTOMIA /FIST/ OP PLAST CANALICULOS",
    "25077 - MODULO DE CIRUGIA DE ESTRABISMO CON SUTURA AJUSTABLES BILATERAL",
    "25138 - VITRECTOMIA ANTERIOR UNILATERAL",
    "25053 - MODULO FACOEMULSIFICACIÓN DEL CRISTALINO - CIRUGÍA DE CATARATA IMPLANTE DE LIO (Unilateral)",
    "25151 - VITRECTOMIA POSTERIOR (CIRUGIA VITREORETINAL)",
    "25165 - INYEC. INTRAVITREA DE AVASTIN UNILATERAL",
    "305028 - CONSULTA VESTIDA OFTALMOLOGICA 1 POR AÑO",
    "305002 - CONSULTA EN CONSULTORIO OFTALMOLOGICA Y CONTROL DE PRACTICAS",
    "425007 - CONSULTA DE URGENCIA NOCTURNA Y/O FINES",
    "251300 - MODULO CIRUGIA REFRACTIVA CON EXCIMER LASER EN MIOPIA Y ASTIGMATISMO (Unilateral)",
    "30504 - MODULO HONORARIOS DIAGNOSTICO RETINOPATIA DEL PREMATURO (Bilateral)",
    "26805 - INYECCIÓN INTRAVÍTREA DE SUSTANCIAS ANTIANGIOGÉNICAS (NO Incluye Lucentis/ Eylea)",
    "300135 - MODULO PARA TRATAMIENTO DE OJO SECO CONOCLUSORES LAGRIMALES (Unilateral)",
    "305101 - RETINOGRAFIA CON TRES PLACAS (Unilateral)",
    "300127 - ECOMETRÍA Y CÁLCULO DIÓPTRICO DE LA LENTE (Unilateral)",
    "305107 - RECUENTO ENDOTELIAL - MICROSCOPIA ESPECULAR COMPUTARIZADA (Unilateral)",
    "305111 - TOMOGRAFIA DE COHERENCIA ÓPTICAAÑOS (Bilateral)",
    "305126 - INTERFEROMETRÍA DE COHERENCIA PARCIAL -IOL MASTER (Unilateral)",
    "305127 - PENTACAM (Bilateral)",
    "300115 - EXTRACCION DE CUERPO EXTRAÑO CONJUNTIVAL",
    "300116 - EXTRACCION DE CUERPO EXTRAÑO CORNEAL"
  ]
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setIndications(inputValue);

    if (inputValue) {
      setFilteredOptions(options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      ));
    } else {
      setFilteredOptions([]);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        label={indicatonsName}
        variant="static"
        value={indications}
        onChange={handleChange}
        className="w-full"
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setIndications(option);
                setFilteredOptions([]);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;  