import React from 'react';
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import { bscChain, polyChain, ethChain, sepChain, hardChain, bscTest, ethTest, polyTest } from '../../engine/chainchange';
import SearchBar from "./Header/SearchBar";
import SearchBarMob from "./Header/MobileSearchBar";
import { useState, useEffect } from "react";
import { Dropdown, Col } from "@nextui-org/react";

const HeaderEl = styled.header`
  z-index: 10;
  display: flex;
  color: ${Colors.White};
  width: 100%;
  align-items: center;
  height: 4rem;
  gap: 1rem;
  padding: 1rem;
  top: 0;
  background-color: ${Colors.Background};
  box-shadow: 0px 0px 2rem ${Colors.Primary};
  

  position: sticky;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LogoText = styled.a`
  font-size: 1.2rem;
  font-weight: 800;
  color: ${Colors.White};
  display:none;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  padding-right: 1rem;
`;

const Nav = styled.nav`
  margin-left: auto;
  padding-right: 1rem;
  display: none;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 3rem;
  }

  @media ${Devices.Laptop} {
    display: block;
  }
`;

const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 400;
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.Laptop} {
    display: none;
  }
`;
const MenuIcon = styled(SearchIcon)``;

const AuthItems = styled(NavItem)`
  font-size: 1rem;
  display: none;
  @media ${Devices.Laptop} {
    display: inherit;
  }
`;


export default function Header({ mobileMenu }) {
  const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu;

  function toggleMenu() {
    setMobileMenuIsOpen(!MobileMenuIsOpen);
  }  

  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
    const selectedValue = React.useMemo(
      () => Array.from(selected).join(", ").replaceAll("_", " "),
      [selected]
    );

    const blockImage = React.useMemo(() => {
        var eth = "Ethereum";
        var bsc = "Binance Smart Chain";
        var pol = "Polygon";
        var mum = "Mumbai";
        var bsct = "Bsctest";
        var goe = "Goerli";
        var hard = "Hardhat";
        var sep  = "Sepolia";
        var init = "Set Network";
        if (selectedValue == eth) {
            return(
              <img src='./ethereumlogo' width={"160px"}/>
            )
        }
        else if (selectedValue == bsc) {
          return(
            <img src={bsclogo} width={"160px"}/>
          )
        }
        else if (selectedValue == pol) {
          return(
            <img src='./polygonwhite.png' width={"160px"}/>
          )
        }
        else if (selectedValue == mum) {
            return(
              <h4>Mumbai Testnet</h4>
            )
          }
        else if (selectedValue == bsct) {
            return(
                <h4>BSC Testnet</h4>
            )
          }
        else if (selectedValue == goe) {
            return(
                <h4>Goerli Testnet</h4>
            )
          }
        else if (selectedValue == hard) {
            return(
                <h4>Hardhat Node</h4>
            )
          }
        else if (selectedValue == sep) {
            return(
                <h3>Sepolia Testnet</h3>
            )
          }
        else if (selectedValue == init) {
            return(
                <div className='mt-4'>
                <h4>Select Network</h4>
                </div>
            )
          }
      })

    async function enableChain() {
        var bsc = "Binance Smart Chain";
        var poly = "Polygon";
        var eth = "Ethereum";
        var mum = "Mumbai";
        var bsct = "Bsctest";
        var sep  = "Sepolia";
        var goe = "Goerli";
        var hard = "Hardhat";
        if (bsc == selectedValue) {
          bscChain();
        } else if (poly == selectedValue) {
          polyChain();
        } else if (eth == selectedValue) {
          ethChain();
        } else if (hard == selectedValue) {
          hardChain();
        } else if (mum == selectedValue) {
          sepChain();
        } else if (bsct == selectedValue) {
          bscTest();
        } else if (goe == selectedValue) {
          ethTest();
        } else if (mum == selectedValue) {
          polyTest();
        } 
      useEffect(() => {
        enableChain();
      }, [selected]);
    }


  return (
    <HeaderEl>


      <MenuIcon>
        {MobileMenuIsOpen ? (
          <IoClose
            style={{ fontSize: "2.5rem" }}
            color={Colors.Primary}
            onClick={() => {
              toggleMenu();
            }}
          />
        ) : (
          <FiMenu
            onClick={() => {
              toggleMenu();
            }}
          />
        )}
      </MenuIcon>


      <Center>
        <Logo href="/" src="/images/GravityLogo.png" />
        <LogoText href="/">GRAVITY</LogoText>
        <Nav>
          <ul>
            <li>
              <NavItem href="/" >Home</NavItem>
            </li>
            <li>
              <NavItem href="/marketplace">Event Marketplace</NavItem>
            </li>
            <li>
              <NavItem href="/warranty">Warranty Management</NavItem>
            </li>
            <li>
              <Col css={{ marginTop: "$6" }}>
              <Dropdown>
              <Dropdown.Button
                aria-label='Connect Wallet'
                flat
                style={{
                background: Colors.Background,
                fontSize: "16px",
                fontWeight: "400",
                marginLeft: "0",
                padding: "0",
                color: "white",
                }}
                css={{ tt: "capitalize" }}>
                {blockImage}
              </Dropdown.Button>
              <Dropdown.Menu
                  css={{ 
                    backgroundColor:'#ffffff30'
                  }}
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                  textValue={selected}> 
                  <Dropdown.Item textValue="Ethereum" key="Ethereum">
                    Ethereum
                  </Dropdown.Item>
                  <Dropdown.Item
                    textValue="Binance Smart Chain"
                    key="Binance Smart Chain"
                  >
                  Binance Smart Chain
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Polygon" key="Polygon" >
                    Polygon
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Hardhat" key="Hardhat">
                    HardHat Node
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Goerli" key="Goerli">
                    Goerli TestNet
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Sepolia" key="Sepolia">
                    <div onClick={() => {
                      sepChain()
                    }}>Sepolia TestNet</div>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Bsctest" key="Bsctest">
                    <div onClick={ () => {
                      bscTest()
                    }}>BSC Testnet</div>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Mumbai" key="Mumbai">
                    <div onClick={() => {
                      polyTest()
                    }}>
                    Mumbai TestNet
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Col>
            </li>
            <li>
              <Button>Connect Wallet</Button>
            </li>
          </ul>
        </Nav>

      </Center>
    </HeaderEl>
  );
}
