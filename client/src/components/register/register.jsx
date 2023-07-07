import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Steps, Carousel, Col, Row } from 'antd';
import "./register.scss"
const { Step } = Steps;

const Registration = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page1Data, setPage1Data] = useState({});
  const [page2Data, setPage2Data] = useState({});
  const [aldata, setaldata] = useState({})

  useEffect(() => {
    if (currentStep === 2) {
      const allData = { ...page1Data, ...page2Data };
      setaldata(allData)
    }
  }, [currentStep, page1Data, page2Data]);

  
  useEffect(() => {
    const postApi = async () => {
      await axios.post('http://localhost:8000/api/register', { aldata: aldata })
    }
    if (Object.keys(aldata).length !== 0) {
      postApi();
    }
  }, [aldata]);
  
  const handleNext = async (values) => {
    try {
      await form.validateFields(); // 驗證表單數據
      setPage1Data(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('表單驗證失敗:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values) => {
    setLoading(true);
    // 在這裡處理最終提交的邏輯，例如發送API請求等
    console.log('Received values:', values);
    setLoading(false);
    setPage2Data(values);
    setCurrentStep(2);
  };

  const registerchange = () => { };



  return (
    <div id='registerout'>
      <Row id='register' >
        <Col span={12}>
          <Carousel autoplay className='Carousel' style={{ height: "100%" }}>
            <div>
              <img
                // style={contentStyle}
                src="http://localhost:8000/img/q123/2mm潛水手套-2.jpg"
                alt="Carousel Image 1"
              />
            </div>
            <div>
              <img
                // style={contentStyle}
                src="http://localhost:8000/img/q123/2mm潛水手套-2.jpg"
                alt="Carousel Image 2"
              />
            </div>
            <div>
              <img
                // style={contentStyle}
                src="http://localhost:8000/img/q123/2mm潛水手套-2.jpg"
                alt="Carousel Image 3"
              />
            </div>
          </Carousel>
        </Col>

        <Col span={12}>
          <Steps current={currentStep} className='col-8 '>
            <Step title="帳號密碼" />
            <Step title="個人資訊" />
            <Step title="完成註冊" />
          </Steps>
          {currentStep === 0 && (
            <Form form={form} layout="vertical" onFinish={handleNext}  >
              <Form.Item

                label="帳號"
                name="username"
                rules={[
                  { required: true, message: '請輸入帳號' },
                  {
                    // pattern: /^[a-zA-Z0-9_-]{4,12}$/,
                    message: '帳號必須由4到12個字母、數字、下劃線或破折號組成',
                  },
                ]}
              >
                <Input size='large' prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="密碼"
                name="password"
                rules={[
                  { required: true, message: '請輸入密碼' },
                  // { min: 6, message: '密碼至少需要6個字符' },
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>

              <Form.Item
                label="再次輸入密碼"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '請再次輸入密碼' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('兩次輸入的密碼不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={registerchange}>
                  下一步
                </Button>
              </Form.Item>
            </Form>

          )}

          {currentStep === 1 && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}

            >
              <Form.Item

                label="姓名/暱稱"
                name="name"
                rules={[{ required: true, message: '請輸入姓名/暱稱' }]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label="身分證"
                name="identityCard"
                rules={[
                  { required: true, message: '請輸入身分證號碼' },
                  {
                    // pattern: /^[A-Z]{1}[1-2]{1}[0-9]{8}$/,
                    message: '身分證格式不正確',
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label="生日"
                name="birthday"
                rules={[{ required: true, message: '請輸入生日' }]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label="手機"
                name="phoneNumber"
                rules={[{ required: true, message: '請輸入手機號碼' }]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label="電子信箱"
                name="email"
                rules={[
                  { required: true, message: '請輸入電子信箱' },
                  { type: 'email', message: '請輸入有效的電子信箱' },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={handlePrev}>
                  上一步
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  註冊
                </Button>
              </Form.Item>
            </Form>

          )}
          {currentStep === 2 && (
            <div>
              <h3>已經提交的表單資料：</h3>

              <p>註冊已完成！</p>
            </div>
          )}
        </Col>
      </Row>
    </div>

  );
};

export default Registration;