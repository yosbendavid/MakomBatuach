import styled from "styled-components";

export const FiletDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 75%;
  margin: 25px auto 0 auto;
  margin-left: auto;
  border: 2px solid #f2f2f2;
  height: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const PatientName = styled.p`
  font-size: 18px;
  margin: 0;
  text-align: center;
  flex-grow: 2;
  color: gray;
  margin-right: 5px;
`;

export const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;