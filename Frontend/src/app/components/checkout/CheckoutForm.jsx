"use client";
import {
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useStore } from "../../context/Product";
import {
  Container,
  CustomButton,
  CustomRadioGroup,
  CustomRow,
  InnerContainer,
  InnerNested,
  Quantity,
  ShippingMethod,
  SummaryWrapper,
} from "./CheckoutFormStyled";
import AddressForm from "./addressform/AddressForm";

const { Text } = Typography;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CheckoutForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const {
    cartItems,
    calculateSubtotal,
    checkoutCart,
    customerInfo,
    updateCustomerInfo,
    closeCartDrawer,
  } = useStore();
  const subtotal = useMemo(() => calculateSubtotal(), [cartItems]);
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  const handleBillingAddressChange = (e) => {
    setShowBillingAddress(e.target.value === "different");
  };

  const handleCompleteOrder = async (values) => {
    const { firstName, lastName, phone, postalCode, saveInfo, ...rest } =
      values;
    const customerInfo = {
      ...rest,
      name: `${firstName} ${lastName}`,
      phone: parseInt(phone, 11),
      postalCode: postalCode ? parseInt(postalCode, 10) : null,
    };

    updateCustomerInfo(customerInfo, saveInfo);
    closeCartDrawer();
    await checkoutCart();
    router.push(`/trackorder`);
  };

  return (
    <Container>
      <Row gutter={20} justify="center" align="top">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={customerInfo}
            onFinish={handleCompleteOrder}
          >
            <Title level={4}>Contact</Title>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Email Address" />
            </Form.Item>
            <AddressForm title="Delivery" useTooltip />
            <Form.Item name="saveInfo" valuePropName="checked">
              <Checkbox>Save this information for next time</Checkbox>
            </Form.Item>
            <Title level={4}>Payment</Title>
            <Form.Item label="All transactions are secure and encrypted.">
              <ShippingMethod>
                <Text strong>Cash on Delivery (COD)</Text>
              </ShippingMethod>
            </Form.Item>
            <InnerContainer>
              <CustomRadioGroup
                defaultValue="same"
                onChange={handleBillingAddressChange}
              >
                <Radio value="same">Same as shipping address</Radio>
                <Radio value="different">Use a different billing address</Radio>
              </CustomRadioGroup>

              {showBillingAddress && (
                <AddressForm title="Billing Address" useTooltip />
              )}
            </InnerContainer>
            <CustomButton block htmlType="submit">
              Complete Order
            </CustomButton>
          </Form>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          xxl={{ span: 12 }}
        >
          <SummaryWrapper>
            {cartItems.map((item) => (
              <CustomRow key={item.id} align="middle" gutter={16}>
                <Col>
                  <InnerNested>
                    <Image
                      src={`${API_BASE_URL}/${item.image}`}
                      alt={item.name}
                      width={64}
                      height={64}
                      preview={false}
                    />
                    <Quantity>
                      <p>{item.quantity}</p>
                    </Quantity>
                  </InnerNested>
                </Col>
                <Col flex="auto">
                  <Text>{item.name}</Text>
                  <br />
                  <Text>Size: {item.size}</Text>
                </Col>
                <Col>
                  <Text>{`Rs:${item.price}`}</Text>
                </Col>
              </CustomRow>
            ))}
            <Row justify="space-around">
              <Text strong>SUBTOTAL:</Text>
              <Text strong>{`Rs.${subtotal}`}</Text>
            </Row>
          </SummaryWrapper>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
