import React from "react";
import { useTheme } from "styled-components";
import "./toggle.css";

interface IToggle {
  text?: string;
  size?: any;
  disabled?: boolean;
  checked: boolean;
  offstyle?: string;
  onstyle?: string;
  onChange: (arg: any) => void;
}

const Toggle = ({
  text,
  size = "default",
  checked,
  disabled,
  onChange,
  offstyle = "btn-danger",
  onstyle = "btn-success",
}: IToggle) => {
  let displayStyle = checked ? onstyle : offstyle;

  return (
    <>
      <label>
        <span className={`${size} switch-wrapper`}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e)}
          />
          <span
            className={`${displayStyle} switch`}
            style={
              {
                "--bg": "#A1A1BB",
              } as React.CSSProperties
            }
          >
            <span className="switch-handle" />
          </span>
        </span>
        <span className="switch-label">{text}</span>
      </label>
    </>
  );
};

export default Toggle;
