import { CareType } from "@/generated/prisma";
import BedIcon from "./BedIcon";
import ExitIcon from "./ExitIcon";
import DayCareIcon from "./DayCareIcon";

export default function CareTypeIcon({ typeOfCare }: { typeOfCare: CareType }) {
  if (typeOfCare === "Stationary") return <BedIcon />;
  else if (typeOfCare === "Ambulatory") return <ExitIcon />;
  else if (typeOfCare === "Day_Care") return <DayCareIcon />;

  throw new Error("Unable to detect type of care icon.");
}
