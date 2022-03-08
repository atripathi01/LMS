import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import classes from "./footer.module.css";
import { Link} from "react-router-dom";
import { DASH_BOARD, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "../../../constants/pathContainer";

const Footer = () => {
  return (
      <>
    <div className={classes.footer}>
      <section className={classes.container}>
        <div className={classes.logoNlink}>
          <h1 className={classes.logo_footer}><a  className={classes.linkdeco} href="#">Dono LMS</a> </h1>
          <div className={classes.linksTnL}>
            <TwitterIcon className={classes.conatactLink} />
            <LinkedInIcon className={classes.conatactLink} />
          </div>
        </div>
        <div className={classes.linkCnt}>
          <ul className={classes.paglink}>
            <li className={classes.footerItem}><Link className={classes.linkdeco}  to={HOME_PATH}> Home</Link></li>
            <li className={classes.footerItem}><Link className={classes.linkdeco}  to={DASH_BOARD}> Dashboard</Link></li>
            <li className={classes.footerItem}><Link  className={classes.linkdeco} to={LOGIN_PATH}> Login</Link></li>
            <li className={classes.footerItem}><Link className={classes.linkdeco}  to={REGISTER_PATH}>Register</Link> </li>
          </ul>
        </div>
        <div className={classes.linkCnt}>
          <ul className={classes.paglink}>
            <li className={classes.footerItem}>Twitter</li>
            <li className={classes.footerItem}>LinkedIn</li>
            <li className={classes.footerItem}>Facebook</li>
            <li className={classes.footerItem}>example.com</li>
            <li className={classes.footerItem}>exmaple123@example.com</li>
            <li className={classes.footerItem}><a className={classes.linkdeco}  href="#"> Go back to Top</a></li>
          </ul>
        </div>
      </section>
     
    </div>
     <div className={classes.donoCopyright}>
     <div className={classes.copyright}>donoLMS@copyright2022</div>
   </div>
   </>
  );
};

export default Footer;
