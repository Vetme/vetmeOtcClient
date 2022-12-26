import styled from "styled-components";
import { PRIMARY_COLOR, PRIMARY_HOVER, PRIMARY_DISABLED } from "@/themes";

export const Button = styled.button.attrs((props) => ({
  className: props.className,
}))<{ disabled?: boolean; bg?: string }>`
  padding: 0px 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  color: #000000;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  height: 53px;
  white-space: nowrap;
  /* identical to box height */

  letter-spacing: 0.03em;
  transition: 0.3s;
  background: ${({ bg }) => (bg ? bg : "")};
  position: relative;
  display: flex;
  align-items: center;

  &.loading {
    &::after {
      content: "";
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #7da8ff7b;
      position: absolute;
      top: 50%;
      left: 50%;

      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border: 2px solid #fff;
      animation: loading 0.3s alternate infinite;
      transform-origin: center;
    }
  }

  &:hover {
    background: ${({ bg }) => (bg ? bg : "")};
  }

  &.primary {
    background: ${PRIMARY_COLOR};
    position: relative;
    color: #000;

    a {
      color: #fff;
    }

    &:hover {
      background: ${({ disabled }) =>
        disabled ? PRIMARY_COLOR : PRIMARY_HOVER};
    }
  }
  &.primary-accent {
    background: rgba(125, 169, 255, 0.3);
    border: 2px solid #7da9ff;
    border-radius: 10px;
    padding: 0px 20px;

    &:hover {
      background: rgba(125, 169, 255, 0.5);
    }
  }
  &.icon-only {
    padding: 6px !important;
    svg {
      margin: 0px !important;
    }
  }
  &.icon {
    padding: 15px 16px;
    margin-right: 16px;
    svg {
      margin-right: 0px;
    }
  }
  &.icon-tiny {
    border-radius: 32px;
    padding: 4px 16px;
    text-align: center;

    svg {
      height: 16px;
      width: 16px;
      margin: 0px !important;
    }
  }

  &.sm {
    padding: 8px 24px;
    max-height: 38px;
    font-size: 14px;
  }

  &.md {
    height: 53px;
    min-width: 167px;
    font-size: 20px;
  }

  & svg,
  i {
    margin-right: 10px;
  }
  &.block {
    width: 100%;
  }

  &.rounded {
    border-radius: 32px !important;
  }
  &.success {
    background: rgba(121, 185, 127, 0.47);
    border: 3px solid #79b97f;
    padding: 0px 20px;

    &:hover {
      background: rgba(121, 185, 127, 0.8);
    }
    svg,
    path {
      fill: #1a7f24 !important;
    }
  }

  &.info {
    background: #fef5e7;
    color: #ab6a07;

    svg,
    path {
      fill: #ab6a07 !important;
    }
  }

  &.danger {
    background: rgba(235, 87, 87, 1);
    color: #fff;

    svg,
    path {
      fill: rgba(235, 87, 87, 1) !important;
    }
  }

  .btn-loading {
    margin-left: 10px;
    margin-right: 0px;
  }

  @media (max-width: 640px) {
    &.m-sm {
      /* padding: 8px 24px; */
      max-height: 38px;
      font-size: 14px;
    }
  }

  @keyframes loading {
    100% {
      background: #fff;
      box-shadow: 0px 0px 24px #fff;
    }
  }
`;
