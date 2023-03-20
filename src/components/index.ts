import {
  SECONDARY_COLOR_GREEN,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "@/themes";
import styled from "styled-components";
export { default as Footer } from "./Footer";
export { default as TokenBadge } from "./TokenBadge";

export const BodyWrapper = styled.main`
  /* background: #fafafa; */
  padding: 35px 0px;
  flex: 1;
  margin-top: 80px;
`;
export const OnlyMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
`;

export const OnlyDesktop = styled.div`
  display: block;
  @media (max-width: 640px) {
    display: none;
  }
`;

export const MetaLoading = styled.div`
  background: #f9f9f;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const Container = styled.div.attrs(() => ({
  className: "container",
}))``;

export const ContainerSm = styled.div.attrs(() => ({
  className: "container-sm",
}))``;

// export const ContainerSm = styled.div`
//   width: 100%;
//   padding-right: var(--bs-gutter-x, 0.25rem);
//   padding-left: var(--bs-gutter-x, 0.25rem);
//   margin-right: auto;
//   margin-left: auto;

//   @media (min-width: 1200px) {
//     max-width: 1200px;
//   }
//   @media (min-width: 1400px) {
//     max-width: 1320px;
//   }
// `;

export const Avatar = styled.div<{
  size?: "xs" | "sm" | "md" | "lg" | "60px" | "72px";
  sizeM?: string;
}>`
  position: relative;
  height: ${({ size }) =>
    size === "xs"
      ? "20px"
      : size === "sm"
      ? "32px"
      : size === "md"
      ? "46px"
      : size === "60px"
      ? "60px"
      : size === "72px"
      ? "72px"
      : size === "lg"
      ? "128px"
      : "80px"};
  width: ${({ size }) =>
    size === "xs"
      ? "20px"
      : size === "sm"
      ? "32px"
      : size === "md"
      ? "46px"
      : size === "60px"
      ? "60px"
      : size === "72px"
      ? "72px"
      : size === "lg"
      ? "128px"
      : "80px"};
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .badge {
    position: absolute;
    bottom: -7px;
    right: 3px;
  }

  @media (max-width: 640px) {
    height: ${({ sizeM }) => sizeM && sizeM};
    width: ${({ sizeM }) => sizeM && sizeM};
  }
`;
export const Flex = styled.div<{
  direction?: "row" | "column";
  align?: string;
  gap?: number;
  justify?:
    | "space-between"
    | "space-evenly"
    | "space-around"
    | "center"
    | "flex-end";
  directionM?: string;
  margin?: string;
  wrap?: boolean;
  expand?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
  margin: ${({ margin }) => (margin ? margin : "0")};
  flex-wrap: ${({ wrap }) => wrap && "wrap"};
  width: ${({ expand }) => expand && "100%"};
  gap: ${({ gap }) => gap + "px"};

  &.home-p {
    @media (max-width: 640px) {
      padding: 10px 0px;
      margin: 0px 24px;
    }
  }
  @media (max-width: 640px) {
    flex-direction: ${({ directionM }) => directionM && directionM};

    &.grid {
      justify-content: center;
    }
  }
`;
export const Colorize = styled.span<{
  color: string;
}>`
  color: ${({ color }) => color};

  svg {
    fill: ${({ color }) => color};
  }

  path {
    fill: ${({ color }) => color};
  }
`;

export const Text = styled.span<{
  weight?: string;
  size?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "big"
    | "normal"
    | "small"
    | "tiny"
    | "s1"
    | "s2"
    | "s3"
    | "s4";
  color?: string;
  sizeM?: string;
  padding?: string;
  uppercase?: boolean;
}>`
  display: block;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) =>
    size == "h1"
      ? "56px"
      : size == "h2"
      ? "40px"
      : size == "h3"
      ? "26px"
      : size == "h4"
      ? "18px"
      : size == "h5"
      ? "14px"
      : size == "big"
      ? "20px"
      : size == "normal"
      ? "18px"
      : size == "small"
      ? "16px"
      : size == "tiny"
      ? "14px"
      : size == "s1"
      ? "18px"
      : size == "s2"
      ? "16px"
      : size == "s3"
      ? "14px"
      : size == "s4"
      ? "14px"
      : "18px"};
  line-height: 150%;
  color: ${({ color }) => color};

  letter-spacing: 0.02em;
  text-transform: ${({ uppercase }) => uppercase && "Uppercase"};

  &.fancy {
    background: linear-gradient(302.59deg, #a93ceb -21.04%, #6a64ff 124.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 640px) {
    font-size: ${({ sizeM }) =>
      sizeM == "h1"
        ? "56px"
        : sizeM == "h2"
        ? "40px"
        : sizeM == "h3"
        ? "26px"
        : sizeM == "h4"
        ? "18px"
        : sizeM == "h5"
        ? "14px"
        : sizeM == "big"
        ? "20px"
        : sizeM == "normal"
        ? "18px"
        : sizeM == "small"
        ? "16px"
        : sizeM == "tiny"
        ? "14px"
        : sizeM == "tiny-2"
        ? "10px"
        : sizeM == "s1"
        ? "18px"
        : sizeM == "s2"
        ? "16px"
        : sizeM == "s3"
        ? "14px"
        : sizeM == "s4"
        ? "14px"
        : "14px"};
  }
`;

export const H1 = styled.span<{
  weight?: string;
  size?: string;
  color?: string;
  sizeM?: string;
  padding?: string;
  uppercase?: boolean;
}>`
  display: inline-block;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) => (size ? size : "18px")};
  line-height: 150%;
  color: ${({ color, theme }) => (color ? color : theme.colors.text)};

  letter-spacing: 0.02em;
  text-transform: ${({ uppercase }) => uppercase && "Uppercase"};

  &.fancy {
    background: linear-gradient(302.59deg, #a93ceb -21.04%, #6a64ff 124.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 640px) {
    font-size: ${({ sizeM }) => (sizeM ? sizeM : "14px")};
  }
`;

export const H2 = styled.span<{
  weight?: string;
  size?: string;
  color?: string;
  sizeM?: string;
  padding?: string;
  uppercase?: boolean;
}>`
  display: inline-block;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) => (size ? size : "18px")};
  line-height: 150%;
  color: ${({ color, theme }) => (color ? color : theme.colors.text)};

  letter-spacing: 0.02em;
  text-transform: ${({ uppercase }) => uppercase && "Uppercase"};

  &.fancy {
    background: linear-gradient(302.59deg, #a93ceb -21.04%, #6a64ff 124.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 640px) {
    font-size: ${({ sizeM }) => (sizeM ? sizeM : "14px")};
  }
`;

export const H4 = styled.span<{
  weight?: string;
  size?: string;
  color?: string;
  sizeM?: string;
  padding?: string;
  uppercase?: boolean;
}>`
  display: inline-block;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) => (size ? size : "18px")};
  line-height: 150%;
  color: ${({ color, theme }) => (color ? color : theme.colors.text)};

  letter-spacing: 0.02em;
  text-transform: ${({ uppercase }) => uppercase && "Uppercase"};

  &.fancy {
    background: linear-gradient(302.59deg, #a93ceb -21.04%, #6a64ff 124.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 640px) {
    font-size: ${({ sizeM }) => (sizeM ? sizeM : "14px")};
  }
`;

export const Spacer = styled.div<{
  height?: number;
  width?: number;
  heightM?: number;
  widthM?: number;
}>`
  height: 10px;
  height: ${({ height }) => height && height + "px"};
  width: 0px;
  width: ${({ width }) => width && width + "px"};
  flex-shrink: 0;

  @media (max-width: 640px) {
    height: ${({ heightM }) => heightM && heightM + "px"};
    width: ${({ widthM }) => widthM && widthM + "px"};
  }
`;

export const IconWrapper = styled.div<{
  height: number;
  width: number;
  heightM?: number;
  widthM?: number;
  color?: string;
}>`
  fill: ${({ color }) => color && color};

  svg {
    height: ${({ height }) => height && height + "px"};
    width: ${({ width }) => width && width + "px"};

    @media (max-width: 640px) {
      height: ${({ heightM }) => heightM && heightM + "px"};
      width: ${({ widthM }) => widthM && widthM + "px"};
    }
  }
`;

export const Center = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     text-align;
     margin:auto;
  `;

export const Divider = styled.div`
  border: 1px solid
    ${({ theme }) =>
      theme.name === "Dark" ? "rgba(255, 255, 255, 0.1)" : "#F1F1F3"};
  height: 0px;
  width: 100%;
`;

export const VDivider = styled.div<{ height: number }>`
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: ${({ height }) => height + "px"};
  transform: translateX(16px);
`;

export const SizeIcon = styled.div<{
  height: number;
  width: number;
}>`
  svg {
    height: ${({ height }) => height + "px"};
    width: ${({ width }) => width + "px"};
  }
`;
export const Wrapper = styled.div``;

export const GroupAvatars = styled.div`
  display: inline-block;
`;
export const GroupAvatar = styled.div<{
  width?: number;
  height?: number;
  count?: string;
}>`
  display: flex;
  position: relative;
  width: ${({ width }) => (width ? width + "px" : "24px")};
  height: ${({ height }) => (height ? height + "px" : "24px")};
  border: 2px solid #191823;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;

  &.avatar {
    position: relative;
    &::before {
      content: ${({ count }) => `'+${count}'`};
      position: absolute;
      top: 0;
      right: -27px;
      background: #26252f80;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
    }
  }

  &.avatar img:not(:first-child) {
    margin-left: -75%;
  }
  &.avatar img:last-child {
    margin-top: -5px;
  }
  &.avatar img {
    width: 100%;
    display: block;
    border-radius: 50%;
  }
`;
export const BodyTab = styled(Flex)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: fit-content;

  span {
    padding: 15px 40px;
    cursor: pointer;
    transition: color 0.3s;
    color: ${({ theme }) => (theme.name === "Light" ? "#87839A;" : "#87839A;")};

    &.active,
    &:hover {
      border-bottom: 4px solid rgba(106, 100, 255, 1);
      color: ${({ theme }) => theme.colors.text2};
    }
  }

  @media (max-width: 640px) {
    width: inherit;
  }
`;

export const FancyBg = styled.div<{
  top: number;
  left: number;
}>`
  position: fixed;
  width: 87.5px;
  height: 47px;
  top: ${({ top }) => top && top + "%"};
  left: ${({ left }) => left && left + "%"};
  -webkit-filter: blur(63px);
  z-index: -1;
  filter: blur(63px);
  background: linear-gradient(rgba(169, 60, 235, 1), rgba(106, 100, 255, 1));
`;

export const Loader = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: transparent;
  border: 20px solid rgba(255, 255, 255, 0.05);
  margin: auto;
  position: relative;

  &:after {
    content: "";
    height: 20px;
    width: 20px;
    left: -12px;
    top: -12px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #6a64ff;
    position: absolute;
    border-radius: 50%;
    background: transparent;
    -webkit-animation: rotate 0.5s linear infinite;
    animation: rotate 0.6s linear infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const CustomLink = styled.a`
  position: relative;
  margin: 0px 16px;
  transition: 0.3s;

  span:nth-child(1),
  span:nth-child(3) {
    position: absolute;
    transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span:nth-child(1) {
    left: -8px;
  }

  span:nth-child(3) {
    right: -8px;
  }

  &:hover {
    span:nth-child(1) {
      left: -14px;
    }
    span:nth-child(3) {
      right: -14px;
    }
  }
`;

export const ActionBtn = styled.button`
  all: unset;
  background: ${SECONDARY_COLOR_GREEN};
  height: 83px;
  width: 100%;
  border: 1px solid #2e203e;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 18px;
  /* Blue/Main (900) */
  position: relative;
  line-height: 83px;
  color: #170728;
  cursor: pointer;
  text-align: center;
  z-index: 50;
  transition: 0.3s ease-in-out;

  &:hover,
  :active {
    background: ${SECONDARY_COLOR};
  }
  div {
    position: absolute;
    right: 14px;
    top: 14px;

    height: 55px;
    line-height: 55px;
    width: 55px;
    border-radius: 100px;
    background: ${PRIMARY_COLOR};
  }

  &:after {
    content: "";
    position: absolute;
    border: 1px solid #2e203e;
    height: 100%;
    width: 100%;
    bottom: -6px;
    left: -6px;
    border-radius: 12px;
    z-index: -1;
    border-top: none;
    border-right: none;
  }

  &.sm {
    height: 54px;
    line-height: 54px;
  }

  &.secondary {
    background: #fbf2ff;
    border: 1px solid #2e203e;
    &:hover,
    :active {
      background: #f7f0fb;
    }
  }
  &.icon {
    svg {
      margin-top: 14px;
    }
  }
`;

export const Overlay = styled.div`
  background: rgba(242, 255, 245, 0.7);
  backdrop-filter: blur(5px);
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 996;
  position: fixed;
`;

export const InputCon = styled.div`
  label {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #453953;
    text-transform: uppercase;
  }
`;
export const InputBox = styled.div`
  display: flex;
  background-image: url(/images/bg/input.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  height: 75px;
  align-items: center;
  position: relative;

  input {
    text-transform: uppercase;
  }

  label {
    position: absolute;
    top: 0px;
    text-transform: uppercase;
    left: 38px;
  }

  @media (max-width: 640px) {
    /* height: 58px; */
  }

  &.standard {
    width: 383px;
    @media (max-width: 640px) {
      width: 100%;
    }

    div {
      width: 100% !important;
    }
  }
`;
export const Input = styled.input`
  height: 50px;
  position: relative;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-weight: 400;
  font-size: 18px;
  width: 30%;
  color: #170728;
  margin-left: 38px;

  @media (max-width: 640px) {
    /* font-size: 30px; */
  }
`;

export const InputInner = styled.div`
  display: flex;
  top: 11.5px;
  align-items: center;
  position: relative;
  padding-right: 10px;
`;

export const ErrorMsg = styled.div`
  font-size: 12px;
  color: #f04438;
  line-height: 16px;
  margin-left: 25px;
  position: absolute;
  bottom: -16px;
`;
