import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";

const GamesView = () => {
  const account = useContext(AccountContext);

  return account && (
    <p>{account.firstName} waz here</p>
  )
}

export default GamesView