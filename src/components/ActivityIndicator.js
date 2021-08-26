import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import "./activityIndicator.css";

const ActivityIndicator = ({ height }) => {
  return (
    <div style={{ height: height }} className="activity">
      <Dots color="white" size="10em" />
    </div>
  );
};

export default ActivityIndicator;
