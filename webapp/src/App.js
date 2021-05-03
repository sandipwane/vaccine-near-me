/* eslint-disable react-hooks/exhaustive-deps */
// import logo from './logo.svg';
import { Input, Button, Table, Tag, DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

import "./App.css";

const columns = [
  {
    title: "State",
    dataIndex: "state_name",
    key: "state_name",
  },
  {
    title: "District",
    dataIndex: "district_name",
    key: "district_name",
  },
  {
    title: "Hospital",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Vaccine",
    dataIndex: "vaccine",
    key: "vaccine",
  },
  {
    title: "Price(₹)",
    dataIndex: "fee",
    key: "fee",
    render: (fee) => {
      return <>{fee === "0" ? "Free" : fee}</>;
    },
  },
  {
    title: "Age",
    dataIndex: "min_age_limit",
    key: "min_age_limit",
    render: (minAge) => {
      return <>{minAge + " and above"}</>;
    },
  },
  {
    title: "Slots",
    key: "slots",
    dataIndex: "slots",
    render: (slots) => (
      <span>
        {slots.map((slot) => {
          // let color = tag.length > 5 ? "geekblue" : "green";
          // if (tag === "loser") {
          //   color = "volcano";
          // }
          // const tagContainerCss = {
          //   display: 'flex',
          //   // flexDirection: 'column'
          // }
          return (
            <div>
              <Tag color="geekblue" key={slot}>
                {slot}
              </Tag>
            </div>
          );
        })}
      </span>
    ),
  },
];

async function getSlots(pincode, date) {
  const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;
  return await fetch(url);
}

function App() {
  const [pincode, setPincode] = useState();
  const [date, setDate] = useState();
  const [data, setData] = useState([]);
  const [age, setAge] = useState();
  const [check, setCheck] = useState(false);

  useEffect(async () => {
    const response = await getSlots(pincode, date);
    response.json().then((r) => {
      console.info(r);
      if ("sessions" in r) {
        let sessions = r.sessions;
        debugger;
        if (parseInt(age) > 0) {
          sessions = sessions.filter((slot) => slot.min_age_limit <= age);
        }
        setData(sessions);
      } else {
        setData([]);
      }
    });
    setCheck(false);
  }, [check]);

  function onChange(date) {
    // debugger;
    // console.log(date, dateString);
    if (date) setDate(date.format("DD-MM-YYYY"));
  }

  return (
    <div className="App">
      <div className="layout">
        <h1> Check Vaccine Availability</h1>
        <div>
          <ul class="wrapper">
            <li class="form-row">
              <label for="name">Pincode</label>
              <Input
                id="pin-code"
                type="number"
                placeholder="e.g. 445001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              ></Input>
            </li>
            <li class="form-row">
              <label for="townborn">Date</label>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </li>
            <li class="form-row">
              <label for="townborn">Age</label>
              <Input
                // id="pin-code"
                type="number"
                placeholder="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              ></Input>
            </li>
            <li class="form-row">
              <Button
                onClick={() => {
                  setCheck(true);
                }}
                type="primary"
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </li>
            {/* <li class="form-row">
          <label for="email">Email Address</label>
          <input type="email" id="email">
        </li>
        <li class="form-row">
          <button type="submit">Submit</button>
        </li> */}
          </ul>
        </div>
        {/* <div className="box">
          <form>
            <div>
              <lable>Pin Code</lable>
              <div className="pincode-input">
                <Input
                  id="pin-code"
                  type="number"
                  placeholder="e.g. 445001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                ></Input>
              </div>
              <lable>Date</lable>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </div>
            <Button
              onClick={() => {
                setCheck(true);
              }}
              type="primary"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </form>
        </div> */}
        <div>
          <Table dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default App;
