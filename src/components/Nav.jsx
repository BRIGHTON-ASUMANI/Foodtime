/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

const Nav = (display_form, logged_in, handle_logout) => {
  const logged_out_nav = (
    <ul>
      <li onClick={() => display_form('login')}>login</li>
      <li onClick={() => display_form('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={handle_logout}>logout</li>
    </ul>
  );
  return <div>{logged_in ? logged_in_nav : logged_out_nav}</div>;
};

export default Nav;
