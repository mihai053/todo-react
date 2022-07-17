import React from 'react';
import classes from './SideDrawer.module.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

// componenta pentru mobile
// remove react transition todo
const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <aside className={classes['side-drawer']} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  //pentru a putea pune bara in stanga inainte de root
  return ReactDOM.createPortal(content, document.querySelector('#drawer-hook'));
};

export default SideDrawer;
