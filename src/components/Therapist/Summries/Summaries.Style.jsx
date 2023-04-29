import styled from "styled-components";
import { ReactComponent as LeftArrowIcon } from '../Img/left-arrow-svgrepo-com.svg';
import { ReactComponent as BackIcon } from '../Img/Right_arrow_back.svg.svg';


export const ContainerSummaries = styled.div`
  padding: 80px 0;
`;

export const TitleSummary = styled.h1`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-shadow: 1px 1px #ccc;
  font-family: sans-serif;
  letter-spacing: 2px;
  background-color: #D5BCBC;
`;

export const SummaryDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 75%;
  margin: 40px auto 0 auto;
  margin-left: auto;
  border: 2px solid #f2f2f2;
  height: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  flex-direction: column;
`;

export const SummaryNum = styled.p`
  font-size: 18px;
  margin: 5px;
  text-align: center;
  color: gray;
  font-weight: bold;
`;

export const SummaryDate = styled.p`
  font-size: 16px;
  margin: 0;
  text-align: center;
  color: black;
`;

export const ReturnIcon1 = styled(BackIcon)`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

export const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;