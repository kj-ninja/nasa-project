import { Link } from "react-router-dom";
import favicon from "../../images/favicon.png";
import check from "../../images/check.png";
import update from "../../images/update.png";
import history from "../../images/history.png"
import {
  Container,
  Navigation,
  Tittle,
  Logo,
  Image,
  LinkBox
} from "./styles";

const Header = () => {
  return (
    <Container>
      <Logo src={favicon} alt=""/>
      <Tittle>NASA Mission Control</Tittle>
      <Navigation>
        <LinkBox>
          <Link to={"/launch"} className="link">
            <Image src={check} alt=""/>Launch
          </Link>
        </LinkBox>

        <LinkBox>
          <Link to={"/upcoming"} className="link">
            <Image src={update} alt=""/><span>Upcoming</span>
          </Link>
        </LinkBox>

        <LinkBox>
          <Link to={"/history"} className="link">
            <Image src={history} alt=""/><span>History</span>
          </Link>
        </LinkBox>
      </Navigation>
    </Container>
  )
}

export default Header;