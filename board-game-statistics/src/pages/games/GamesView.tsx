import { useContext } from "react";
import { AccountContext } from "../../AccountContext";

const GamesView = () => {
  const account = useContext(AccountContext);

  return account && (
    <p>{account.firstName} waz here</p>
  )
}

export default GamesView