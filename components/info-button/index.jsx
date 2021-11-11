
import { Info } from "react-feather";
import { IconButton } from "./info-button.css";

const InfoButton = props => {
    return (
        <IconButton type="button" {...props}>
            <Info {...props} />
        </IconButton>
    )
}

export default InfoButton;