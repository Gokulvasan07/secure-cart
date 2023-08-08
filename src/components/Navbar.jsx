import { Button, ButtonGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../contracts/SecureCart.json";
import { NavLink } from "react-router-dom";

function BrandExample() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectToMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.formatEther(balance);
    setBalance(balanceInEther);
    setAccount(accounts[0]);

    const SecureCart = await new ethers.Contract(
      "0xA25F490787B456D1e48b53A0a7C16a7E438aBCb6",
      abi.abi,
      provider
    );

    const tokenName = await SecureCart.listProducts();

    console.log(tokenName);

    const ESPData = tokenName.map((product) => ({
      product_id: product.id.toString(),
      product_name: product.name,
      product_price: product.price.toString(),
      product_quantity: product.quantity.toString(),
      product_description: product.description,
      product_image: product.imageUrl,
      product_category: product.category,
      product_owner: product.seller,
    }));
    console.log(ESPData);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              //   src={logo}
              width="30"
              height="30"
              className="mx-3 d-inline-block align-top"
            />
            SecureCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto p-2">
              <NavLink className="nav-link" to="/login">
                  Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                  Register
              </NavLink>
              <NavLink className="nav-link" to="/products">
                  Products
              </NavLink>
            </Nav>
            <>
              {isWalletInstalled !== true && account === null && (
                <Button disabled variant="warning" onClick={connectToMetamask}>
                  Install Metamask
                </Button>
              )}
              {isWalletInstalled == true && account === null && (
                <Button onClick={connectToMetamask}>Connect</Button>
              )}
              {isWalletInstalled === true && account !== null && (
                <>
                  <ButtonGroup>
                    <Button className="" disabled onClick={connectToMetamask}>
                      Connected{" "}
                      {account.slice(0, 4) + "...." + account.slice(-5, -1)}
                    </Button>
                    <Button variant="secondary">
                      {balance.slice(0, 6)} ETH
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Body account={account} /> */}
    </>
  );
}

export default BrandExample;
