import React from "react";
import { Navbar as BootstrapNavbar } from "react-bootstrap";

export function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <BootstrapNavbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Insurance Agent Test
      </BootstrapNavbar.Brand>
    </BootstrapNavbar>
  );
}
