"use client";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
const { Option } = Select;

const AddressForm = ({ title, useTooltip }) => (
  <>
    {title && <Title level={4}>{title}</Title>}
    <>
      <Form.Item name="country" initialValue="Pakistan">
        <Select size="large">
          <Option value="Pakistan">Pakistan</Option>
        </Select>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input size="large" placeholder="First name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input size="large" placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input size="large" placeholder="Address" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input size="large" placeholder="City" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="postalCode">
            <Input
              type="number"
              size="large"
              placeholder="Postal code (optional)"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input
          size="large"
          type="number"
          placeholder="Phone Number"
          suffix={
            useTooltip && (
              <Tooltip title="In case we need to contact you about your order">
                <QuestionCircleOutlined />
              </Tooltip>
            )
          }
        />
      </Form.Item>
    </>
  </>
);

export default AddressForm;
