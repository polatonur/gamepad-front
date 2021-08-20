import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import "./activityIndicator.css";

const ActivityIndicator = () => {
  return (
    <div className="activity">
      <Dots color="white" size="10em" />
    </div>
  );
};

export default ActivityIndicator;
