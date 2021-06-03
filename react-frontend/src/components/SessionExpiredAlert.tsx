import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

interface Props {
  sessionExpired: boolean;
}

const SessionExpiredAlert: React.FC<Props> = ({ sessionExpired }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    open={sessionExpired}
    message={"Session expired. You must sign in again. "}
    action={
      <Button color="primary" onClick={() => window.location.reload()}>
        Reload
      </Button>
    }
  />
);

export default SessionExpiredAlert;
