import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function Alerts() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2} className="mt-2">
      <Alert severity="success">
        Live chatroom is now available. Check it out{" "}
        <Link to={"/chat"}>
          <span className="text-red-400 font-semibold underline">here</span>
        </Link>
      </Alert>
    </Stack>
  );
}

{
  /* <Alert severity="success">This is a success Alert.</Alert>
<Alert severity="warning">This is a warning Alert.</Alert>
<Alert severity="error">This is an error Alert.</Alert> */
}
