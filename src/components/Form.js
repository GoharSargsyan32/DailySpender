import React, { useState } from "react";
import {
  Button,
  Select,
  Input,
  DatePicker,
  List,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import { db } from "../services/firbase";
import "antd/dist/reset.css";
import { collection, addDoc, getDocs } from "firebase/firestore";

const { Option } = Select;

function Form() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [records, setRecords] = useState([]);
  const [showHistory, setShowHistory] = useState(false);


  const handleSave = async () => {
    if (selectedCategory && amount && date) {
      const newRecord = {
        category: selectedCategory,
        amount: parseFloat(amount),
        date: date.format("YYYY-MM-DD"),
      };

      try {
        const recordsCollection = collection(db, "records"); 
        await addDoc(recordsCollection, newRecord);
        message.success("Record saved successfully!");
        setSelectedCategory("");
        setAmount("");
        setDate(null);
      } catch (error) {
        console.error("Error saving record:", error);
        message.error(`Failed to save record: ${error.message}`);
      }
    } else {
      message.warning("Please fill in all fields!");
    }
  };


  const fetchRecords = async () => {
    try {
      const recordsCollection = collection(db, "records"); 
      const querySnapshot = await getDocs(recordsCollection);

      if (!querySnapshot.empty) {
        const fetchedRecords = querySnapshot.docs.map((doc) => doc.data());
        setRecords(fetchedRecords);
        setShowHistory(true);
      } else {
        setRecords([]);
        message.info("No records found.");
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
      message.error(`Failed to fetch records: ${error.message}`);
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setAmount("");
    setDate(null);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Spender App
      </Typography.Title>

      {!showHistory ? (
        <>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Typography.Text>Select a Category:</Typography.Text>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: "100%", marginTop: "5px" }}
                placeholder="Select a category"
              >
                <Option value="Food">Food</Option>
                <Option value="Shopping">Shopping</Option>
                <Option value="Car">Car</Option>
                <Option value="Payments">Payments</Option>
                <Option value="Leisure">Leisure</Option>
              </Select>
            </Col>

            <Col span={24}>
              <Typography.Text>Enter Amount:</Typography.Text>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Enter amount"
              />
            </Col>

            <Col span={24}>
              <Typography.Text>Select Date:</Typography.Text>
              <DatePicker
                value={date}
                onChange={setDate}
                style={{ width: "100%" }}
              />
            </Col>

            <Col span={24}>
              <Row gutter={[16, 16]} justify="center">
                <Col>
                  <Button type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleReset} type="default">
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button onClick={fetchRecords} type="link">
                    History
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Typography.Title level={4}>Saved Records</Typography.Title>
          <List
            bordered
            dataSource={records}
            renderItem={(record) => (
              <List.Item>
                {record.category} - ${record.amount} on {record.date}
              </List.Item>
            )}
          />
          <Button
            onClick={() => setShowHistory(false)}
            type="primary"
            style={{ marginTop: "20px" }}
          >
            Back
          </Button>
        </>
      )}
    </div>
  );
}

export default Form;
