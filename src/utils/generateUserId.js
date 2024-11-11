import { v4 } from "uuid";

const generateUserId = () => {
    const id = v4();
    return id;
  };

  export default generateUserId;