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

  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  cursor: pointer;
  height: 53px;
  white-space: nowrap;
  /* identical to box height */

  letter-spacing: 0.03em;
  transition: 0.3s;
  background: ${({ bg }) => (bg ? bg : "")};

  &:hover {
    background: ${({ bg }) => (bg ? bg : "")};
  }

  &.primary {
    background: ${({ disabled }) =>
      disabled ? PRIMARY_DISABLED : PRIMARY_COLOR};
    position: relative;
    color: #000;

    a {
      color: #fff;
    }

    &:hover {
      background: ${({ disabled }) =>
        disabled ? PRIMARY_DISABLED : PRIMARY_HOVER};
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

  @media (max-width: 640px) {
    &.m-sm {
      /* padding: 8px 24px; */
      max-height: 38px;
      font-size: 14px;
    }
  }
`;
