import { NavLink } from "react-router-dom";

import s from "./nav.module.css";

function Nav() {
  
  const coun = () =>{
    if(window.location.href === "http://localhost:3000/home"){
      window.location.reload(true);
    }
  }
  
  return (
    <div className={s.nav}>
      <div class={s.div}>
      <h1>Countries App</h1>
      </div>
      <NavLink className={s.link}  to="/home">
        <div className={s.box}>
          <br/>
          <p className={s.p} onClick={coun}>HOME</p>
          <br/>
        </div>
      </NavLink>

      <NavLink className={s.link} to="/addactivity">
        <div className={s.box}>
          <br/>
          <p className={s.p}>AGREGAR ACTIVIDAD</p>
          <br/>
        </div>
      </NavLink>
      
    </div>
  );
}
/*
        <NavLink className={styles.link} to="/home/addactivity">
          AÑADIR ACTIVIDAD
          <img className={styles.plus} src={plus} alt="Add" />
        </NavLink>

*/
export default Nav;