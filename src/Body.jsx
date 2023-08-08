import { Alert, Button, Container, FormControl, Table } from "react-bootstrap";
import { ethers } from "ethers";
import abi from "./ContractABI/Storage.json";
import { useState, useEffect } from "react";
function Body({ account }) {
  const fetchData = async () => {
    const provider = new ethers.Web3Provider(window.ethereum);
    const storageContract = new ethers.Contract(
      "0xA25F490787B456D1e48b53A0a7C16a7E438aBCb6",
      abi.abi,
      provider
    );
    const tokenName = await storageContract.getAllData();
    const ESPData = tokenName.map((student) => ({
      temperature: student.temperature,
      humidity: student.humidity,
      timestamp: student.timestamp.toString(),
    }));
    setData(ESPData);
    console.log(ESPData);
    setInt(tokenName.toString());
  };
  const [Data, setData] = useState([]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      {account === null && (
        <Container>
          <Alert className="text-center m-2" variant="danger">
            <h1>Please Connect the MetaMask Wallet</h1>
          </Alert>
        </Container>
      )}
      {account !== null && (
        <Container className="">
          <Button className="float-end m-3" onClick={() => fetchData()}>
            FetchData
          </Button>
          <Table variant="dark" className="m-5" striped bordered hover>
            <thead>
              <tr>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((id) => (
                <tr>
                  <td>{id.temperature.toString()}</td>
                  <td>{id.humidity.toString()}</td>
                  <td>{id.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}

export default Body;
